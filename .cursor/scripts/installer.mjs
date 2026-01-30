import fs from 'node:fs';
import path from 'node:path';

import {
  describePath,
  ensureCopiedDirectory,
  ensureCopiedFile,
  ensureDir,
  ensureLinkedDirectory,
  ensureLinkedFile,
} from './fs-link.mjs';
import { exportRulesToMarkdown, exportVscodeCopilotInstructions } from './mdc-to-md.mjs';
import { discoverSkills, isOpenCodeSkillName } from './skill-discovery.mjs';

const PROJECT_TARGETS_DEFAULT = ['cursor', 'vscode'];
const PROJECT_TARGETS_ALL = ['cursor', 'vscode', 'opencode', 'antigravity', 'claude'];
const GLOBAL_TARGETS_DEFAULT = ['opencode', 'antigravity', 'claude'];
const GLOBAL_TARGETS_ALL = ['opencode', 'antigravity', 'claude'];

function normalizeTargets({ targets, scope }) {
  const defaults = scope === 'project' ? PROJECT_TARGETS_DEFAULT : GLOBAL_TARGETS_DEFAULT;
  const all = scope === 'project' ? PROJECT_TARGETS_ALL : GLOBAL_TARGETS_ALL;

  if (!targets || targets.size === 0) {
    return new Set(defaults);
  }

  if (targets.has('all')) {
    return new Set(all);
  }

  const resolved = new Set();
  for (const t of targets) {
    if (all.includes(t)) resolved.add(t);
  }

  return resolved.size > 0 ? resolved : new Set(defaults);
}

function getEnvPath(name) {
  const v = process.env[name];
  return v && String(v).trim() ? String(v).trim() : null;
}

export function getDefaultProjectRoot() {
  return process.cwd();
}

export function exportAll({ hubRoot }) {
  const rules = exportRulesToMarkdown({ hubRoot });
  const vscode = exportVscodeCopilotInstructions({ hubRoot });
  return { rules, vscode };
}

export function installProject({ hubRoot, projectRoot, targets, inactiveNonCursor = false }) {
  const projectAbs = path.resolve(projectRoot);
  const hubAbs = path.resolve(hubRoot);
  const enabled = normalizeTargets({ targets, scope: 'project' });

  if (projectAbs === hubAbs) {
    throw new Error(
      [
        'Refusing to install into the hub directory itself.',
        'Pass --project pointing to your project root (the folder that should contain a .cursor/ link).',
      ].join(' ')
    );
  }

  // 1) Ensure exports exist (needed for VS Code + Antigravity rules)
  const exports = exportAll({ hubRoot: hubAbs });

  /** @type {{name: string, result: any}[]} */
  const actions = [];
  const inactiveMode = Boolean(inactiveNonCursor);
  const inactiveTargets = new Set();
  const activeTargets = new Set(enabled);

  if (inactiveMode) {
    for (const t of enabled) {
      if (t !== 'cursor') {
        inactiveTargets.add(t);
        activeTargets.delete(t);
      }
    }
  }

  // Cursor: project/.cursor -> hub
  if (activeTargets.has('cursor')) {
    const cursorLink = path.join(projectAbs, '.cursor');
    if (path.resolve(cursorLink) !== hubAbs) {
      actions.push({
        name: 'cursor.projectLink',
        result: ensureLinkedDirectory({ linkPath: cursorLink, targetPath: hubAbs }),
      });
    }
  }

  // VS Code Copilot: project/.github/copilot-instructions.md -> exported file
  if (activeTargets.has('vscode')) {
    const copilotTarget = exports.vscode.dest;
    const copilotLink = path.join(projectAbs, '.github', 'copilot-instructions.md');
    actions.push({
      name: 'vscode.copilotInstructions',
      result: ensureLinkedFile({ linkPath: copilotLink, targetPath: copilotTarget }),
    });
  }

  const hubSkills = path.join(hubAbs, 'skills');

  // OpenCode: project/.opencode/skill -> hub/skills
  if (activeTargets.has('opencode')) {
    const opencodeSkillLink = path.join(projectAbs, '.opencode', 'skill');
    actions.push({
      name: 'opencode.projectSkills',
      result: ensureLinkedDirectory({ linkPath: opencodeSkillLink, targetPath: hubSkills }),
    });
  }

  // Antigravity workspace: project/.agent/skills + project/.agent/rules
  if (activeTargets.has('antigravity')) {
    const agSkillsLink = path.join(projectAbs, '.agent', 'skills');
    actions.push({
      name: 'antigravity.workspaceSkills',
      result: ensureLinkedDirectory({ linkPath: agSkillsLink, targetPath: hubSkills }),
    });

    const agRulesTarget = path.join(hubAbs, 'dist', 'exports', 'rules-md');
    const agRulesLink = path.join(projectAbs, '.agent', 'rules');
    actions.push({
      name: 'antigravity.workspaceRules',
      result: ensureLinkedDirectory({ linkPath: agRulesLink, targetPath: agRulesTarget }),
    });
  }

  // Claude Code: project/.claude/skills -> hub/skills
  if (activeTargets.has('claude')) {
    const claudeSkillsLink = path.join(projectAbs, '.claude', 'skills');
    actions.push({
      name: 'claude.workspaceSkills',
      result: ensureLinkedDirectory({ linkPath: claudeSkillsLink, targetPath: hubSkills }),
    });
  }

  if (inactiveTargets.size > 0) {
    const inactiveRoot = path.join(projectAbs, '.cursor-inactive');

    if (inactiveTargets.has('vscode')) {
      const copilotTarget = exports.vscode.dest;
      const copilotCopy = path.join(inactiveRoot, 'vscode', 'copilot-instructions.md');
      actions.push({
        name: 'vscode.inactiveCopy',
        result: ensureCopiedFile({ destPath: copilotCopy, sourcePath: copilotTarget }),
      });
      ensureDir(path.join(projectAbs, '.github'));
    }

    if (inactiveTargets.has('opencode')) {
      const opencodeCopy = path.join(inactiveRoot, 'opencode', 'skill');
      actions.push({
        name: 'opencode.inactiveCopy',
        result: ensureCopiedDirectory({ destPath: opencodeCopy, sourcePath: hubSkills }),
      });
      ensureDir(path.join(projectAbs, '.opencode'));
    }

    if (inactiveTargets.has('antigravity')) {
      const agSkillsCopy = path.join(inactiveRoot, 'antigravity', 'skills');
      const agRulesCopy = path.join(inactiveRoot, 'antigravity', 'rules');
      actions.push({
        name: 'antigravity.inactiveSkillsCopy',
        result: ensureCopiedDirectory({ destPath: agSkillsCopy, sourcePath: hubSkills }),
      });
      actions.push({
        name: 'antigravity.inactiveRulesCopy',
        result: ensureCopiedDirectory({
          destPath: agRulesCopy,
          sourcePath: path.join(hubAbs, 'dist', 'exports', 'rules-md'),
        }),
      });
      ensureDir(path.join(projectAbs, '.agent'));
    }

    if (inactiveTargets.has('claude')) {
      const claudeCopy = path.join(inactiveRoot, 'claude', 'skills');
      actions.push({
        name: 'claude.inactiveCopy',
        result: ensureCopiedDirectory({ destPath: claudeCopy, sourcePath: hubSkills }),
      });
      ensureDir(path.join(projectAbs, '.claude'));
    }
  }

  return {
    projectRoot: projectAbs,
    hubRoot: hubAbs,
    exports,
    targets: Array.from(enabled),
    inactiveTargets: Array.from(inactiveTargets),
    actions,
  };
}

export function installGlobal({ hubRoot, targets }) {
  const hubAbs = path.resolve(hubRoot);
  const exports = exportAll({ hubRoot: hubAbs });
  const enabled = normalizeTargets({ targets, scope: 'global' });

  /** @type {{name: string, result: any}[]} */
  const actions = [];

  // OpenCode global: %LOCALAPPDATA%/opencode/skill/<skill-name> -> source skill dir
  if (enabled.has('opencode')) {
    const localAppData = getEnvPath('LOCALAPPDATA');
    if (localAppData) {
      const opencodeGlobalSkillRoot = path.join(localAppData, 'opencode', 'skill');
      ensureDir(opencodeGlobalSkillRoot);

      const skills = discoverSkills({ hubRoot: hubAbs });
      let linked = 0;
      let skipped = 0;
      for (const s of skills) {
        if (!isOpenCodeSkillName(s.name)) {
          skipped++;
          continue;
        }
        const dest = path.join(opencodeGlobalSkillRoot, s.name);
        actions.push({
          name: `opencode.globalSkill:${s.name}`,
          result: ensureLinkedDirectory({ linkPath: dest, targetPath: s.dir }),
        });
        linked++;
      }

      actions.push({
        name: 'opencode.globalSummary',
        result: { root: opencodeGlobalSkillRoot, linked, skipped },
      });
    } else {
      actions.push({
        name: 'opencode.globalSummary',
        result: { skipped: true, reason: 'LOCALAPPDATA not set' },
      });
    }
  }

  // Antigravity global: %USERPROFILE%/.gemini/antigravity/{skills,rules}
  const userProfile = getEnvPath('USERPROFILE');
  if (enabled.has('antigravity')) {
    if (userProfile) {
      const agRoot = path.join(userProfile, '.gemini', 'antigravity');
      const agSkills = path.join(agRoot, 'skills');
      const agRules = path.join(agRoot, 'rules');
      actions.push({
        name: 'antigravity.globalSkills',
        result: ensureLinkedDirectory({ linkPath: agSkills, targetPath: path.join(hubAbs, 'skills') }),
      });
      actions.push({
        name: 'antigravity.globalRules',
        result: ensureLinkedDirectory({
          linkPath: agRules,
          targetPath: path.join(hubAbs, 'dist', 'exports', 'rules-md'),
        }),
      });
    } else {
      actions.push({
        name: 'antigravity.globalSummary',
        result: { skipped: true, reason: 'USERPROFILE not set' },
      });
    }
  }

  // Claude Code global: %USERPROFILE%/.claude/skills -> hub/skills
  if (enabled.has('claude')) {
    if (userProfile) {
      const claudeRoot = path.join(userProfile, '.claude');
      const claudeSkills = path.join(claudeRoot, 'skills');
      actions.push({
        name: 'claude.globalSkills',
        result: ensureLinkedDirectory({ linkPath: claudeSkills, targetPath: path.join(hubAbs, 'skills') }),
      });
    }
  }

  return { hubRoot: hubAbs, exports, targets: Array.from(enabled), actions };
}

export function doctorProject({ hubRoot, projectRoot }) {
  const projectAbs = path.resolve(projectRoot);
  const hubAbs = path.resolve(hubRoot);

  const checks = [
    { name: 'cursor.projectLink', path: path.join(projectAbs, '.cursor') },
    { name: 'vscode.copilotInstructions', path: path.join(projectAbs, '.github', 'copilot-instructions.md') },
    { name: 'opencode.projectSkills', path: path.join(projectAbs, '.opencode', 'skill') },
    { name: 'antigravity.workspaceSkills', path: path.join(projectAbs, '.agent', 'skills') },
    { name: 'antigravity.workspaceRules', path: path.join(projectAbs, '.agent', 'rules') },
    { name: 'claude.workspaceSkills', path: path.join(projectAbs, '.claude', 'skills') },
  ];

  return {
    hubRoot: hubAbs,
    projectRoot: projectAbs,
    exports: {
      rules: describePath(path.join(hubAbs, 'dist', 'exports', 'rules-md')),
      vscode: describePath(path.join(hubAbs, 'dist', 'exports', 'vscode', 'copilot-instructions.md')),
    },
    checks: checks.map((c) => ({ ...c, info: describePath(c.path) })),
  };
}

