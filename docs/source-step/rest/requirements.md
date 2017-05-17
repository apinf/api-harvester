# REST scraping
[X-Road APIs](https://liityntakatalogi.suomi.fi/api/3/action/package_list) is one datasource. We will use this as the example datasource and this is the only datasource in scope of this project.

Develop in NodeJS

There are 2 parts for running the Source step for REST scraping:
- Navigation
- Harvesting API data

## Navigation
REST scraping is similar to web scraping. There typically is a REST endpoint that gives a list of APIs which provides IDs that can be used to navigate to the details of each API separately.
The [configuration file](sample-xroad.json) needs to contain the necessary information so that the REST scraping module can navigate through a list and go to the detail API of each API.

We can get the API list with GET call: https://liityntakatalogi.suomi.fi/api/3/action/package_list

It returns JSON:

```
{
	"help": "https://liityntakatalogi.suomi.fi/api/3/action/help_show?name=package_list",
	"success": true,
	"result": ["ajokorttitiedot", "aloitepalvelut", "atvarvojoukotrajapinta", "atventiteettirajapinnat", "atvreferenssitietopalvelu", "atvyhdistelmarajapinnat", "hsywatermsystem", "infraservices", "kirjaamisosatietopalvelu", "kkysely", "kyllapito", "omatajoneuvot", "omatveneet", "palveluvayla", "rolesauthsservice", "virta-otp", "voimassaolopalvelu", "vrkclient", "vtjkysely", "vtjyllapito", "xroadvirre-services", "xroadytj-services"]
}
```
That JSON needs to be parsed and extract "result" content (array) from there. It is assumed that above resultset will always be comma separated array of API identifiers. (["ajoneuvoliikennerekisteri", "kiinteistotietojarjestelma", "vtjkysely-sovelluskysely-hetuhaku"]).  

The config file contains the necessary data to enable the retrievel of all APIs from a list.
```
...
"list": "https://liityntakatalogi.suomi.fi/api/3/action/help_show?name=package_list",
"detail": "https://liityntakatalogi.suomi.fi/api/3/action/package_search?q={{id}}",
"pagination": {
  "selector": "result",
  "limit": 5,
}
...
```
- list: The API that provides us with a list of APIs
- detail: The API that provides us with more details of a specific API. Replace {{id}} with identifier that we retrieve from the list API.
- pagination
  - selector: the response containing the list of APIs
  - limit: How many APIs to harvest (when not defined, there is no limit)



The get information from one API we take the name of the API (each in the above array is name of an API), and put that as parameter to second GET method. In the below example we get JSON formatted details about "vtjkysely-sovelluskysely-hetuhaku".  
https://liityntakatalogi.suomi.fi/api/3/action/package_search?q=vtjkysely-sovelluskysely-hetuhaku

That will return JSON [x-road detail sample](x-road.json)

## Harvesting API data
The config file contains a "fields" section which identifies the data being scraped:
- title
- url
- description

This is also the [JSON output](../sample-out.json) from the Source step.
