# APInf Data models

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
- What to do with organisation name? 
