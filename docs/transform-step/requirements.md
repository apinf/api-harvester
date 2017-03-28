

## Transform
The Transform component takes data in and matches it to a predefined datamodel. The output is again JSON.

### Datamodel OUT
NOTE: Not sure if this is explicitely needed to have in a config file. The info will be in the config files for each source specifically. Anyway good to have as a doc.

The Datamodel OUT is also a configuration file. For now, following example is sufficient:
- Title
- API endpoint URL
- Homepage URL
- Description
- Company/organisation name

[Sample datamodel OUT](https://github.com/apinf/api-harvester/blob/master/data-models-as-json.md).  
Needs to be matched when REST API is implemented. See https://github.com/apinf/platform/issues/2102

**QUESTION:** What if the source has different language versions for metadata? For example X-Road catalog has all information in three languages: en, sv and fi.
**ANSWER:** pick the english content if easy to achieve. Otherwise take the "first" language version in source content.  





## Transform

```
{
  'name': 'programmableweb',
  'fields': {
    'title': {
      'source': 'header',
      'default': 'foobar'
    },
    'endpoint': {
      'source': 'api',
      'default': 'foobar.com'
    },
    'description': {
      'source': 'content',
      'default': 'Lorem hipsum...'
    }

  ...
  }
}
```
