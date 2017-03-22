# Introduction
Apinf.io has a catalog that lists APIs. We need content.
That content can come from multiple sources. This is a first step towards world API domination.

# Requirements
- No GUI is needed. We work with command line.
- NodeJS is deemed the most appropriate: JSON, mature, easy to deploy
- The scope is minimal, but this project needs to be done modular. This way we can expand easily.

# Components
There are 2 main components in scope: "Source" and "Transform".

## Source
The first component fetches data from defined datasources and outputs the results in JSON. There are multiple types of datasources, each of which is again a seperate module. The main component plays an orchestration role.

The output does not need to be saved to disk. JSON gets passed on to the next component (Transform) in memory.

The logic for the Source components is saved in configuration files for each source. The command line takes either a parameter that points to this folder (and then runs every file in the folder) or a specific file (and runs only that file).

A first draft for the config files are below.

Some metadata is also saved, such as timestamp and source.

### REST api
Some of the datasources offer a REST api. We can call the API and fetch data. Easy.

### HTML scraper
Some of the datasources are just HTML pages on the web. Scraping is the solution.
Plenty of popular scraping libraries exist for NodeJS, e.g.
- https://github.com/IonicaBizau/scrape-it
- https://github.com/lapwinglabs/x-ray
- https://github.com/rchipka/node-osmosis
(feel free to make your own choice, can be another one entirely)


### CSV file
Basically read the file and transform CSV to JSON.

## Transform
The Transform component takes data in and matches it to a predefined datamodel. The output is again JSON.

### Datamodel OUT
NOTE: Not sure if this is explicitely needed to have in a config file. The info will be in the config files for each source specifically. Anyway good to have as a doc.

The Datamodel OUT is also a configuration file. For now, following example is sufficient:
- Title
- API endpoint URL
- Homepage URL
- Description
- Company

Additionally metadata (from the Source component)
- Last scraped
- Source


# Configuration files
These are just very rough proposals, please improve!

## Source

## Datamodel OUT

```
{
  'title': {
    'source': 'header',
    'default': 'foobar'
  },
  'endpoint': {
    'source': 'api',
    'default': 'foobar.com'
  }
  
  ...
}
```


# Not to worry about
- Conflict resolution
- Ownership
- Deleted APIs
- Scheduling
- Lifecycle
- Performance
- Frontend design
- Legal
