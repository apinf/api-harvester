# APInf Data models


Current API configuration in apinf.io

```
{
	"_id": "9nuJDa2vLQNaxmJQh",
	"latestMonitoringStatusCode": "-1",
	"name": "Ampersand test",
	"description": "test",
	"url": "https://api.apinf.io",
	"lifecycleStatus": "design",
	"managerIds": [
		"gYwfyAcuKxQ9udgSt"
	],
	"authorizedUserIds": [],
	"created_at": "2017-02-27T12:48:57.148Z",
	"bookmarkCount": 1,
	"isPublic": true,
	"updated_at": "2017-03-24T01:05:09.405Z",
	"submit_methods": [
		"get",
		"post",
		"delete",
		"put"
	],
	"documentationFileId": "2a1822480ff90cdc31600561"
}
```

Current APInf Catalog REST API data model for adding API with POST method:

```
{
  "id": "string", (what ever is given, is overriden at server end)
  "name": "My REST API",
  "description": "My REST API description",
  "api_endpoint_url": "https://my.rest.api.com/v1",
  "lifecycle": "Design",
  "created_at": "2012-07-14T01:00:00+01:00",
  "updated_at": "2012-07-14T01:00:00+01:00",
  "organization": 1234
}
```



## Notes

### What to do with organisation name? 
Orgs are handled with ids.
- One rather complex option is to make query to CAtalog REST API: get organization list and then match the source organization name to list from apinf.io. If match is found, take the ID and add that to datamodel OUT. Some APIs are not attached to orgs. 
- We just dont care about organisations now (not good either)

Perhaps we need to have: 
```
{
  "id": "string", (what ever is given, is overriden at server end)
  "name": "My REST API",
  "description": "My REST API description",
  "api_endpoint_url": "https://my.rest.api.com/v1",
  "lifecycle": "Design",
  "created_at": "2012-07-14T01:00:00+01:00",
  "updated_at": "2012-07-14T01:00:00+01:00",
  "organization": 1234,
  "logo_url": "url",
  "contact_name":"",
  "contact_email":""
}
```
