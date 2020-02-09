<!----- Conversion time: 3.227 seconds.


Using this Markdown file:

1. Cut and paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β17
* Sun Feb 09 2020 10:34:06 GMT-0800 (PST)
* Source doc: https://docs.google.com/a/owasp.org/open?id=1QdNW4VJOMrbXUW00tUexd51C2ozl2Uyo8Y-MtgP6jcQ
* This document has images: check for >>>>>  gd2md-html alert:  inline image link in generated source and store images to your server.
----->

## OWASP Application Security Fragmentation

_Or how I worried less and stood on the shoulders of giants. - Spyros Gasteratos, Elie Saad_



### 1. The Software Development LifeCycle and You

The Systems Development Lifecycle is often depicted as a 6 part cyclical process where every step builds on top of the previous ones. In a similar fashion, security can be embedded in a SDLC by building on top of previous steps with policies, controls, designs, implementations and tests making sure that the product only performs the functions it was designed to and nothing more.

However, modern Agile practitioners often find themselves at an impasse, there is a wealth of competing projects, standards and vendors who all claim to be the best solution in the field.

The following article attempts to provide a long list of Free (as in Freedom) and Open Source solutions and frameworks that worked for us. It’s split into 6 sections, mapping loosely with the SDLC stages on the diagram below. Each section involves somewhat exaggerated low and high maturity scenarios of following the approach listed in it. The entire article can be summarised by the diagram at its end.

![alt_text](writeups/images/sdlc_diag.png "typical sdlc diagram")



#### 1.1. Planning aka Requirements Gathering & Analysis

The Requirements gathering process tries to answer the question: _“What is the system going to do?”_ At this stage, [SAMM project](https://owaspsamm.org/model/) offers 3 distinct maturity levels covering both [in-house](https://owaspsamm.org/model/design/security-requirements/stream-a/) software development and [third party](https://owaspsamm.org/model/design/security-requirements/stream-b/) supplier security. 



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/OWASP-in0.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/OWASP-in0.png "image_tooltip")


Organisations can use these to add solid security considerations at the start of the Software Development or Procurement process.

These general security considerations can be audited by using a subsection of the ASVS controls in section V1 as a questionnaire. This process attempts to ensure that every feature  has concrete security considerations.

In case of internal development and if the organisation maps Features to Epics, the [Security Knowledge Framework](https://securityknowledgeframework.org/) can be used to facilitate this process by leveraging it’s questionnaire function, shown below.

**Example low maturity scenario:**

Customer commissions application that aggregates data from a number of stores offering a unified API for all data querying and retrieval.  The users of the system will be customer employees. The application needs to be accessible from the internet.

Nature of data accessed, retention times,  transport method and backend communication methods aren’t considered.

**Example high maturity scenario:**

The implementor uses a mature Secure Development Lifecycle, the engineering teams receive security training and a detailed list of requirements has been drawn and verified by the customer.


#### 1.2. Design Stage

Once requirements are gathered and analysis performed, implementation specifics need to be defined. The outcome of this stage is usually a diagram outlining data flows and a general system architecture. This presents an opportunity for both threat modeling and attaching security considerations to every ticket and epic that is the outcome of this stage.

There is some great advice on threat modeling out there e.g. [this](https://arstechnica.com/information-technology/2017/07/how-i-learned-to-stop-worrying-mostly-and-love-my-threat-model/) article or [this](https://www.microsoft.com/en-us/securityengineering/sdl/threatmodeling) one.

A bite sized primer by Adam Shostack himself can be found[ here](https://adam.shostack.org/blog/2018/03/threat-modeling-panel-at-appsec-cali-2018/).

OWASP includes a short [article](https://wiki.owasp.org/index.php/Category:Threat_Modeling) on Threat Modeling along with a relevant [Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html). Moreover, if you’re following OWASP SAMM, it has a short section on [Threat Assessment](https://owaspsamm.org/model/design/threat-assessment/).

There’s a few projects that can help with creating Threat Models at this stage, [PyTM](https://github.com/izar/pytm) is one, [ThreatSpec](https://github.com/threatspec/threatspec) is another.

Note: _A threat model can be as simple as a data flow diagram with attack vectors on every flow and asset and equivalent remediations. An example can be found below._



<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/OWASP-in1.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/OWASP-in1.png "image_tooltip")


Last, if the organisation maps Features to Epics, the Security Knowledge Framework can be used to facilitate this process by leveraging it’s questionnaire function.



<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/OWASP-in2.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/OWASP-in2.png "image_tooltip")


This practice has the side effect that it trains non-security specialists to think like attackers.

The outcomes of this stage should help lay the foundation of secure design and considerations.

**Example Low Maturity Scenario:**

Following vague feature requirements the design includes caching data to a local unencrypted database with a hardcoded password.

Remote data store access secrets are hardcoded in the configuration files. All communication between backend systems is plaintext.

Frontend serves data over GraphQL as a thin layer between caching system and end user.

GraphQL queries are dynamically translated to SQL, Elasticsearch and NoSQL queries. Access to data is protected with basic auth set to_ 1234:1234_ for development purposes.

**Example High Maturity Scenario:**

Based on a detailed threat model defined and updated through code, the team decides the following:



*   Local encrypted caches need to expire and auto-purged.
*   Communication channels encrypted and authenticated.
*   All secrets persisted in shared secrets store.
*   Frontend designed with permissions model integration.
*   Permissions matrix defined.
*   Input is escaped output is encoded appropriately using well established libraries.


#### 1.3. Development Stage

The development stage is where assumptions and decisions made in the previous steps will be tested. It’s also the stage where implementation specific bugs happen.

There has been[ extensive discussion](https://docs.google.com/presentation/d/1zbj9XBiv6r6zla0KHNfs63Ux45QZAfRut2zlK7o-dRw/mobilepresent?slide=id.g7c8a58b51e_0_4) on how to approach secure application development from an agile point of view. However, it ultimately depends on parameters specific to each organisation, such as engineering culture, size and competency/seniority of teams, tools available and maturity of security programme.

Anecdotal evidence, points towards code pattern libraries, code anti-pattern libraries, library wrappers with secure defaults, linter configuration and extensive testing suites that attempt to test for security abuse stories.

SAMM at this stage [offers the following generic considerations](https://owaspsamm.org/model/implementation/):



<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/OWASP-in3.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/OWASP-in3.png "image_tooltip")


At any maturity level, linters can be introduced to ensure consistent code. For most linters there is IDE integration enabling software engineers the ability to validate code correctness during development time. Several linters also include security specific rules. This allows for basic security checks before the code is even committed. For example, if you write in Typescript, you can use [tslint](https://github.com/palantir/tslint) along with [tslint-config-security](https://www.npmjs.com/package/tslint-config-security) _ _to easily and quickly perform basic checks.

However, linters cannot detect vulnerabilities in third party libraries, and as software supply chain attacks spread, this consideration becomes  more important. To track third party library usage and audit their security you can use [Dependency Check/Track](https://dependencytrack.org/).

To tackle the security of code developed in house, OWASP offers an extensive collection of [Cheatsheets](https://cheatsheetseries.owasp.org/) demonstrating how to implement features securely. Moreover, the Security Knowledge Framework[1] offers an extensive library of code patterns spanning several programming languages. These patterns can be used to not only jumpstart the development process, but also do so securely.



<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/OWASP-in4.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/OWASP-in4.png "image_tooltip")


Last, there is an abundance of libraries and frameworks implementing secure defaults. For frontend development [ReactJS](https://reactjs.org/) seems to be the latest favourite in the Javascript world.

On the database side, there are [ORM](https://sequelize.org/) libraries and[ Query Builders](https://github.com/kayak/pypika) for most languages.

If you write in Java, the [ESAPI projec](https://www.javadoc.io/doc/org.owasp.esapi/esapi/latest/index.html)t offers several methods to securely implement features, ranging from Cryptography to input escaping and output encoding.

**Example Low Maturity Scenario:**

The team attempted to build the requested features using vanilla NodeJS, connectivity to backend systems is validated by firing an internal request  to _/healthcheck?remoteHost=<xx.xx.xx> _which attempts to run a ping command against the ip specified. All secrets are hard coded. The team uses off the shelf GraphQL libraries but versions are not checked using [Npm Audit](https://docs.npmjs.com/cli/audit). Development is performed by pushing to master which triggers a webhook that uses FTP to copy latest master to the development server which will become production once development is finished.

**Example High Maturity Scenario:**

Team members have access to comprehensive documentation and a library of code snippets they can use to accelerate development.

Linters are bundled with pre-commit hooks and no code reaches master without peer review.

Pre-merge tests are executed before merging code into master. Tests run a comprehensive suite of tests covering unit tests, service acceptance tests, unit tests as well as regression tests.

Once a day a pipeline of specially configured static code analysis tools runs against the features merged that day, the results are triaged by a trained security team and fed to engineering.

There is a cronjob executing Dynamic Analysis tools against Staging with a similar process.

Pentests are conducted against features released on every release and also periodically against the whole software stack.


#### 1.4. Testing Stage

This stage can be used to validate software correctness and it’s results as a metric for the security related decisions of the previous stages. At this stage both automated and manual testing can be performed. SAMM again, offers 3 maturity levels across Architecture Reviews, Requirements testing and Security Testing. Instructions can be found [here](https://owaspsamm.org/model/verification/) and a screenshot is listed below.



<p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/OWASP-in5.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/OWASP-in5.png "image_tooltip")


Testing can be performed several ways and it highly depends on the nature of the software, the organisation’s cadence and the regulatory requirements among other things.

If available, automation is a good idea as it allows detection of easy to find vulnerabilities without much human interaction.

If the application communicates using a web-based protocol,, the [ZAProxy](https://github.com/zaproxy/zaproxy) project can be used to automate a great number of web related attacks and detection. ZAP can be orchestrated using it’s REST API and it can even automate multi-stage attacks by leveraging it’s Zest scripting support.

Vulnerabilities from ZAProxy and a wide variety of other tools can be imported and managed  using a dedicated defect management platform such as[ Defect Dojo](https://github.com/DefectDojo/django-DefectDojo)(screenshot below).

.



<p id="gdcalert7" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/OWASP-in6.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert8">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/OWASP-in6.png "image_tooltip")


For manual testing the [Web](https://github.com/OWASP/wstg) and [Mobile](https://github.com/OWASP/owasp-mstg) Testing guides can be used to achieve a base level of quality for human driven testing.

**Example Low Maturity Scenario:**

The business deployed the system to production without testing. Soon after the client’s routine pentests uncovered deep flaws with pretty much everything. The remediation effort was significant.

**Example High Maturity Scenario:**

The application features received Dynamic Automated testing when each reached staging, a trained QA  team validated business requirements that involved security. A security team performed an adequate pentest and gave a sign-off.


#### 1.5. Release Stage

Hopefully by this stage, features are adequately designed, written and tested. This stage involves configuration, resilience and observability. Here the Mod Security [Core Rule Set](https://github.com/OWASP/www-project-modsecurity-core-rule-set) can be used to effectively detect and block several attacks against the platform.

Moreover, secure configuration standards can be tested for using the [Open Policy Agent](https://www.openpolicyagent.org/)..

Last projects such as the [ELK stack](https://www.elastic.co/elastic-stack), [Grafana](https://grafana.com/) and [Prometheus](https://prometheus.io/docs/introduction/overview/) can be used to aggregate logging and provide observability.

However, no matter the WAFs, Logging and secure configuration enforced at this stage, incidents will occur eventually. Incident management is a complicated and high stress process. To prepare organisations for this, SAMM includes a section on [incident management](https://owaspsamm.org/model/operations/incident-management/) involving simple questions for stakeholders to answer so you can determine incident preparedness accurately.



<p id="gdcalert8" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/OWASP-in7.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert9">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/OWASP-in7.png "image_tooltip")




*   

**Example low maturity scenario:**

The API was queryable by anyone and GraphQL introspection was enabled since all components were left in debug configuration.

Sensitive API paths were not whitelisted. The team found that the application was attacked when the server showed very high CPU load. The response was to bring the system down, very little information about the attack was found apart from the fact that someone was mining cryptocurrencies on the server.

**Example High Maturity scenario:**

The CI/CD system, when migrating successful QA  environments to production applies appropriate configuration to all components. Configuration is tested periodically for drift.

Secrets live in-memory only and are persisted in a dedicated Secrets Storage solution such as Hashicorp Vault.

All application’s ingress points are protected by a WAF and DoS protection.

Logging from all components gets aggregated in dashboards and alerts are raised based on several Thresholds and events. There are canary values and events fired against monitoring from time to time to validate it works.

Business continuity and Security teams run incident management drills periodically to refresh incident playbook knowledge.


### 2. The In-Between Stage

A successful project will hopefully exist for several SDLC cycles. Each cycle adding features and fixing bugs based on the input from previous ones. The time in this stage is often invested in [Retrospective Meetings](https://www.scrum.org/resources/what-is-a-sprint-retrospective), metrics gathering, various admin work and training or culture building.

The Open Source community at this stage comes to the rescue with a number of high quality guides, applications, frameworks and complete integrated solutions.

Concerning metrics, the community has been quite vocal on what to measure and how important it is, the OWASP CISO guide, offers 3 broad categories of SDLC metrics[1] which can be used to measure effectiveness of security practices. Moreover, there is a number of presentations on what could be leveraged to improve a security programme, starting from Marcus’ Ranum [keynote](https://www.youtube.com/watch?v=yW7kSVwucSk) at Appsec California[1], Caroline Wong’s similar [presentation](https://www.youtube.com/watch?v=dY8IuQ8rUd4) and [this presentation](https://www.youtube.com/watch?v=-XI2DL2Uulo) by J. Rose and R. Sulatycki. These among several writeups by private companies all offering their own version of what could be measured. 

However, metrics won’t necessarily improve without training engineering teams and somehow building a security-minded culture. Security training is a long and complicated discussion. There is a variety of approaches out there, on the testing-only end of the spectrum there is fully black box virtual machines such as [DVWA](http://www.dvwa.co.uk/), [Metasploitable series](https://metasploit.help.rapid7.com/docs/metasploitable-2) and the [VulnHub](https://www.vulnhub.com/) project.

The code & remediation end of the spectrum isn’t as well-developed, mainly due to the complexity involved in building and distributing such material. However, there are some respectable solutions, [Remediate The Flag](https://www.remediatetheflag.com/) can be used to setup a code based challenge.



<p id="gdcalert9" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/OWASP-in8.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert10">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/OWASP-in8.png "image_tooltip")


However, if questionnaires is the preferred medium, or if the organisation is looking for self-service testing, [Secure Coding Dojo](https://github.com/trendmicro/SecureCodingDojo) is an interesting solution.

More on the self-service side the Security Knowledge Framework has released several [Labs](https://owasp-skf.gitbook.io/asvs-write-ups/) that each showcase one vulnerability and provides information on how to exploit it.

However, to our knowledge, the most flexible project out there is probably the[ Juice Shop](https://github.com/bkimminich/juice-shop), deployed on Heroku with one click, it offers both CTF functionality and a self-service standalone application that comes with solution detection and a comprehensive progress-board.



<p id="gdcalert10" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/OWASP-in9.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert11">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/OWASP-in9.png "image_tooltip")
 

Bringing it all together, a security team could gather metrics on vulnerabilities detected by team or service using the detection related projects outlined above, then either ask the teams to do the self-service training and validate the effectiveness with a questionnaire solution or deliver the training themselves.


### 5. Conclusion

Security doesn’t have to be hard, by following well established guidelines and using well known solutions an organisation can achieve a good level of security without too much resource allocation.

Below is a diagram summarising tools used at each stage of development.



<p id="gdcalert11" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/OWASP-in10.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert12">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/OWASP-in10.png "image_tooltip")



<!-- Docs to Markdown version 1.0β17 -->