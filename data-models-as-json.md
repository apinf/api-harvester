# APInf Data models

Default values for each attribute will be given below. 

Current API configuration in apinf.io

Perhaps something like this. 

```
{
	"_id": "null", (default is null)
	"latestMonitoringStatusCode": "0", (this is default)
	"name": "Ampersand test", (API name)
        "organizationName":"name of the organization",
	"description": "test", (Description field, around 200 chars)
	"url": "https://api.apinf.io", (API root)
        "specFile": { 
              "url":"Swagger file url", (default is null)
              "type":"swagger"
         },
	"lifecycleStatus": "production", (default is 'production')
	"managerIds": [], (default is empty array)
	"authorizedUserIds": [], (default is empty array)
	"created_at": "2017-02-27T12:48:57.148Z", (when created from harvester point of view)
	"bookmarkCount": 0, (default is 0)
	"isPublic": true, (default is true)
	"updated_at": "2017-03-24T01:05:09.405Z", (when updated from harvester point of view)
	"submit_methods": [], (default is empty array)
	"documentationFileId": "2a1822480ff90cdc31600561" (default is null)
}
```

