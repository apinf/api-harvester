# APInf Data models



## Dummy JSON output with default values.

```
{
	"_id": "null",
	"latestMonitoringStatusCode": "0",
	"name": "null",
        "organizationName":"null",
	"contactEmail":"null",
	"description": "null",
	"tags":[],
	"url": "null", 
        "specFileURL":"null",
	"lifecycleStatus": "production",
	"managerIds": [], 
	"authorizedUserIds": [], 
	"bookmarkCount": 0, 
	"isPublic": true, 
	"updated_at": "2017-03-24T01:05:09.405Z",
	"submit_methods": [],
	"documentationFileId": "null"
}
```

## Example of what it might actually look like 

```
{
	"_id": "null", (default is null)
	"latestMonitoringStatusCode": "0", (this is default)
	"name": "Ampersand test", (API name)
        "organizationName":"name of the organization",
	"contactName":"Jarkko Moilanen",
	"description": "test", (Description field, around 200 chars)
	"tags:["one", "open"] (tags array)
	"url": "https://api.apinf.io", (API root)
        "specFileUrl":"https://uta.fi/swagger.json",
	"lifecycleStatus": "production", (default is 'production')
	"managerIds": [], (default is empty array)
	"authorizedUserIds": [], (default is empty array)
	"bookmarkCount": 0, (default is 0)
	"isPublic": true, (default is true)
	"updated_at": "2017-03-24T01:05:09.405Z", (when harvested)
	"submit_methods": [], (default is empty array)
	"documentationFileId": "2a1822480ff90cdc31600561" (default is null)
}
```

