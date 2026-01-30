# ZAP by Checkmarx Scanning Report

ZAP by [Checkmarx](https://checkmarx.com/).


## Summary of Alerts

| Risk Level | Number of Alerts |
| --- | --- |
| High | 0 |
| Medium | 1 |
| Low | 3 |
| Informational | 9 |




## Alerts

| Name | Risk Level | Number of Instances |
| --- | --- | --- |
| Content Security Policy (CSP) Header Not Set | Medium | 1 |
| Server Leaks Information via "X-Powered-By" HTTP Response Header Field(s) | Low | 1 |
| Timestamp Disclosure - Unix | Low | 1 |
| ZAP is Out of Date | Low | 1 |
| Information Disclosure - Suspicious Comments | Informational | 6 |
| Modern Web Application | Informational | 1 |
| Tech Detected - Google Font API | Informational | 1 |
| Tech Detected - HSTS | Informational | 1 |
| Tech Detected - Next.js | Informational | 1 |
| Tech Detected - Open Graph | Informational | 1 |
| Tech Detected - PWA | Informational | 1 |
| Tech Detected - Priority Hints | Informational | 1 |
| Tech Detected - Tailwind CSS | Informational | 1 |




## Alert Detail



### [ Content Security Policy (CSP) Header Not Set ](https://www.zaproxy.org/docs/alerts/10038/)



##### Medium (High)

### Description

Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.

* URL: http://localhost:3000/

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: ``
  * Other Info: ``


Instances: 1

### Solution

Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.

### Reference


* [ https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
* [ https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html ](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
* [ https://www.w3.org/TR/CSP/ ](https://www.w3.org/TR/CSP/)
* [ https://w3c.github.io/webappsec-csp/ ](https://w3c.github.io/webappsec-csp/)
* [ https://web.dev/articles/csp ](https://web.dev/articles/csp)
* [ https://caniuse.com/#feat=contentsecuritypolicy ](https://caniuse.com/#feat=contentsecuritypolicy)
* [ https://content-security-policy.com/ ](https://content-security-policy.com/)


#### CWE Id: [ 693 ](https://cwe.mitre.org/data/definitions/693.html)


#### WASC Id: 15

#### Source ID: 3

### [ Server Leaks Information via "X-Powered-By" HTTP Response Header Field(s) ](https://www.zaproxy.org/docs/alerts/10037/)



##### Low (Medium)

### Description

The web/application server is leaking information via one or more "X-Powered-By" HTTP response headers. Access to such information may facilitate attackers identifying other frameworks/components your web application is reliant upon and the vulnerabilities such components may be subject to.

* URL: http://localhost:3000/

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `X-Powered-By: Next.js`
  * Other Info: ``


Instances: 1

### Solution

Ensure that your web server, application server, load balancer, etc. is configured to suppress "X-Powered-By" headers.

### Reference


* [ https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/08-Fingerprint_Web_Application_Framework ](https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/08-Fingerprint_Web_Application_Framework)
* [ https://www.troyhunt.com/shhh-dont-let-your-response-headers/ ](https://www.troyhunt.com/shhh-dont-let-your-response-headers/)


#### CWE Id: [ 497 ](https://cwe.mitre.org/data/definitions/497.html)


#### WASC Id: 13

#### Source ID: 3

### [ Timestamp Disclosure - Unix ](https://www.zaproxy.org/docs/alerts/10096/)



##### Low (Low)

### Description

A timestamp was disclosed by the application/web server. - Unix

* URL: http://localhost:3000/_next/static/chunks/65019_next_dist_compiled_react-dom_5bdb469e._.js

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `2080374784`
  * Other Info: `2080374784, which evaluates to: 2035-12-04 04:53:04.`


Instances: 1

### Solution

Manually confirm that the timestamp data is not sensitive, and that the data cannot be aggregated to disclose exploitable patterns.

### Reference


* [ https://cwe.mitre.org/data/definitions/200.html ](https://cwe.mitre.org/data/definitions/200.html)


#### CWE Id: [ 497 ](https://cwe.mitre.org/data/definitions/497.html)


#### WASC Id: 13

#### Source ID: 3

### [ ZAP is Out of Date ](https://www.zaproxy.org/docs/alerts/10116/)



##### Low (High)

### Description

The version of ZAP you are using to test your app is out of date and is no longer being updated.
The risk level is set based on how out of date your ZAP version is.

* URL: http://localhost:3000/

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: ``
  * Other Info: `The latest version of ZAP is 2.17.0`


Instances: 1

### Solution

Download the latest version of ZAP from https://www.zaproxy.org/download/ and install it.

### Reference


* [ https://www.zaproxy.org/download/ ](https://www.zaproxy.org/download/)


#### CWE Id: [ 1104 ](https://cwe.mitre.org/data/definitions/1104.html)


#### WASC Id: 45

#### Source ID: 3

### [ Information Disclosure - Suspicious Comments ](https://www.zaproxy.org/docs/alerts/10027/)



##### Informational (Low)

### Description

The response appears to contain suspicious comments which may help an attacker.

* URL: http://localhost:3000/_next/static/chunks/65019_next_dist_ad4b86e0._.js

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `TODO`
  * Other Info: `The following pattern was used: \bTODO\b and was detected in likely comment: "// TODO: Once we start tracking back/forward history at each route level,", see evidence field for the suspicious comment/snippet.`
* URL: http://localhost:3000/_next/static/chunks/65019_next_dist_client_33e7264d._.js

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `from`
  * Other Info: `The following pattern was used: \bFROM\b and was detected in likely comment: "//# sourceMappingURL=set-attributes-from-props.js.map", see evidence field for the suspicious comment/snippet.`
* URL: http://localhost:3000/_next/static/chunks/65019_next_dist_compiled_e4daccd2._.js

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `TODO`
  * Other Info: `The following pattern was used: \bTODO\b and was detected in likely comment: "// TODO: rename these fields to something more meaningful.", see evidence field for the suspicious comment/snippet.`
* URL: http://localhost:3000/_next/static/chunks/65019_next_dist_compiled_next-devtools_index_76a35474.js

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `bug`
  * Other Info: `The following pattern was used: \bBUG\b and was detected in likely comment: "//",e.exports=r(211)})()},"./dist/compiled/react-dom/cjs/react-dom-client.production.js"(e,t,n){"use strict";var r,o=n("./dist/c", see evidence field for the suspicious comment/snippet.`
* URL: http://localhost:3000/_next/static/chunks/65019_next_dist_compiled_react-dom_5bdb469e._.js

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `debug`
  * Other Info: `The following pattern was used: \bDEBUG\b and was detected in likely comment: "//react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");", see evidence field for the suspicious comment/snippet.`
* URL: http://localhost:3000/_next/static/chunks/turbopack-_5a740681._.js

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `from`
  * Other Info: `The following pattern was used: \bFROM\b and was detected in likely comment: "// We need to store this here instead of accessing it from the module object to:", see evidence field for the suspicious comment/snippet.`


Instances: 6

### Solution

Remove all comments that return information that may help an attacker and fix any underlying problems they refer to.

### Reference



#### CWE Id: [ 615 ](https://cwe.mitre.org/data/definitions/615.html)


#### WASC Id: 13

#### Source ID: 3

### [ Modern Web Application ](https://www.zaproxy.org/docs/alerts/10109/)



##### Informational (Medium)

### Description

The application appears to be a modern web application. If you need to explore it automatically then the Ajax Spider may well be more effective than the standard one.

* URL: http://localhost:3000/

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `<script src="/_next/static/chunks/65019_next_dist_compiled_react-dom_5bdb469e._.js" async=""></script>`
  * Other Info: `No links have been found while there are scripts, which is an indication that this is a modern web application.`


Instances: 1

### Solution

This is an informational alert and so no changes are required.

### Reference




#### Source ID: 3

### [ Tech Detected - Google Font API ](https://www.zaproxy.org/docs/alerts/10004/)



##### Informational (Medium)

### Description

The following "Font scripts" technology was identified: Google Font API.
Described as:
Google Font API is a web service that supports open-source font files that can be used on your web designs.

* URL: http://localhost:3000/

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `fonts.googleapis.com`
  * Other Info: ``


Instances: 1

### Solution



### Reference


* [ https://fonts.google.com/ ](https://fonts.google.com/)



#### WASC Id: 13

#### Source ID: 4

### [ Tech Detected - HSTS ](https://www.zaproxy.org/docs/alerts/10004/)



##### Informational (Medium)

### Description

The following "Security" technology was identified: HSTS.
Described as:
HTTP Strict Transport Security (HSTS) informs browsers that the site should only be accessed using HTTPS.

* URL: http://localhost:3000/

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `Strict-Transport-Security`
  * Other Info: ``


Instances: 1

### Solution



### Reference


* [ https://www.rfc-editor.org/rfc/rfc6797#section-6.1 ](https://www.rfc-editor.org/rfc/rfc6797#section-6.1)



#### WASC Id: 13

#### Source ID: 4

### [ Tech Detected - Next.js ](https://www.zaproxy.org/docs/alerts/10004/)



##### Informational (Medium)

### Description

The following "JavaScript frameworks, Web frameworks, Web servers, Static site generator" technology was identified: Next.js.
Described as:
Next.js is a React framework for developing single page Javascript applications.

* URL: http://localhost:3000/

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `Next.js`
  * Other Info: `The following CPE is associated with the identified tech: cpe:2.3:a:zeit:next.js:*:*:*:*:*:*:*:*
`


Instances: 1

### Solution



### Reference


* [ https://nextjs.org ](https://nextjs.org)



#### WASC Id: 13

#### Source ID: 4

### [ Tech Detected - Open Graph ](https://www.zaproxy.org/docs/alerts/10004/)



##### Informational (Medium)

### Description

The following "Miscellaneous" technology was identified: Open Graph.
Described as:
Open Graph is a protocol that is used to integrate any web page into the social graph.

* URL: http://localhost:3000/

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: ``
  * Other Info: ``


Instances: 1

### Solution



### Reference


* [ https://ogp.me ](https://ogp.me)



#### WASC Id: 13

#### Source ID: 4

### [ Tech Detected - PWA ](https://www.zaproxy.org/docs/alerts/10004/)



##### Informational (Medium)

### Description

The following "Miscellaneous" technology was identified: PWA.
Described as:
Progressive Web Apps (PWAs) are web apps built and enhanced with modern APIs to deliver enhanced capabilities, reliability, and installability while reaching anyone, anywhere, on any device, all with a single codebase.

* URL: http://localhost:3000/

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: ``
  * Other Info: ``


Instances: 1

### Solution



### Reference


* [ https://web.dev/progressive-web-apps/ ](https://web.dev/progressive-web-apps/)



#### WASC Id: 13

#### Source ID: 4

### [ Tech Detected - Priority Hints ](https://www.zaproxy.org/docs/alerts/10004/)



##### Informational (Medium)

### Description

The following "Performance" technology was identified: Priority Hints.
Described as:
Priority Hints exposes a mechanism for developers to signal a relative priority for browsers to consider when fetching resources.

* URL: http://localhost:3000/

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: ``
  * Other Info: ``


Instances: 1

### Solution



### Reference


* [ https://wicg.github.io/priority-hints/ ](https://wicg.github.io/priority-hints/)



#### WASC Id: 13

#### Source ID: 4

### [ Tech Detected - Tailwind CSS ](https://www.zaproxy.org/docs/alerts/10004/)



##### Informational (Medium)

### Description

The following "UI frameworks" technology was identified: Tailwind CSS.
Described as:
Tailwind is a utility-first CSS framework for rapidly building custom user interfaces.

* URL: http://localhost:3000/_next/static/chunks/%255Broot-of-the-server%255D__6cdebd1b._.css

  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `--tw-rotate`
  * Other Info: ``


Instances: 1

### Solution



### Reference


* [ https://tailwindcss.com/ ](https://tailwindcss.com/)



#### WASC Id: 13

#### Source ID: 4


