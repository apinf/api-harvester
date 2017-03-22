### Get meta data about X-Road APIs

API list from url:
* https://liityntakatalogi.suomi.fi/api/3/action/package_list, which returns:

```
{"help": "https://liityntakatalogi.suomi.fi/api/3/action/help_show?name=package_list", "success": true, "result": ["ajoneuvoliikennerekisteri", "kiinteistotietojarjestelma", "vtjkysely-sovelluskysely-hetuhaku"]} 
```
It is assumed that above resultset will always be comma separated array of API identifiers. 

API details in JSON format can be obtained with: 
* https://liityntakatalogi.suomi.fi/api/3/action/package_search?q=vtjkysely-sovelluskysely-hetuhaku
