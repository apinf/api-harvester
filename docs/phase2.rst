Harvester work package
Internship at apinf.io

Introduction
Apinf.io is an opensource SaaS offering an API management platform. On the service we provide information about APIs, so that API users can search and discover interesting APIs.
Apinf.io needs a compelling API catalog if we want to retain users. Therefore, we invested in developing an API harvester. This harvester scrapes other API catalogs available on the web (such as programmable web), so we can add that data to our own catalog.
Scope
So far the harvester is developed with docs on https://github.com/apinf/api-harvester . It will scrape a  website and have all the data transformed to a correct format. The output is JSON.
 
Now we need to tie everything together with the apinf.io platform. There is operational aspects to take into account: POSTing the data to the apinf.io REST API, revisions, conflict resolution, scheduling.
 
POST the data
The output is JSON, which needs to be pushed to the apinf.io REST API. Align data structure so it will work with the backend. Then POST it.
Revisions
The idea is to periodically run the harvester to capture any changes in the data. New APIs are added. Existing APIs are updated. Old APIs are deleted. How do we make this happen?
 
Bonus: if we can “diff” the changes, then we can update users following an API about the changes.
Conflict resolution
An API might already exist (from user input or another data source). We need a set of rules that decide what happens and an interface where humans can solve conflicts that require attention.
Scheduling
The harvesting should happen periodically. This can be a cron job, but something more robust (message broker with queue) should be considered.
Technology
The work so far has been done with Javascript (NodeJS). Where possible stick to Javascript, but this requirement can be negotiated.
Servers are available to run the service.
 
The work should be as decoupled as possible from the apinf.io platform. We believe in modularity.
 
