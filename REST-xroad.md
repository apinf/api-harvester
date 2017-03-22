# Get list of X-Road APIs

API list with GET:
* https://liityntakatalogi.suomi.fi/api/3/action/package_list, which returns:

```
{"help": "https://liityntakatalogi.suomi.fi/api/3/action/help_show?name=package_list", "success": true, "result": ["ajoneuvoliikennerekisteri", "kiinteistotietojarjestelma", "vtjkysely-sovelluskysely-hetuhaku"]} 
```
It is assumed that above resultset will always be comma separated array of API identifiers. 

API details for each API in JSON format can be obtained with: 
* https://liityntakatalogi.suomi.fi/api/3/action/package_search?q=vtjkysely-sovelluskysely-hetuhaku

