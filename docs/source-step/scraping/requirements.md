# Web scraping
[programmableweb.com](https://programmableweb.com) is one datasource. We will use this as the example datasource and this is the only datasource in scope of this project.

Use X-Ray: https://github.com/lapwinglabs/x-ray
This NodeJS library supports navigation.

There are 2 parts for running the Source step for Web scraping:
- Navigation
- Harvesting API data

## Navigation
The [configuration file](sample-programmableweb.json) needs to contain the necessary information so that the web scraping module can navigate through a paginated list and go to the detail page of each API.

![Navigation](../../img/scraping-programmable.png)

To go through all the APIs in for example ProgrammableWeb, you need to use pagination.
- https://www.programmableweb.com/category/all/apis will give the first batch
- https://www.programmableweb.com/category/all/apis?page=1 gives the second batch
- https://www.programmableweb.com/category/all/apis?page=2 gives the 3rd batch
- ... until the end

The config file contains the necessary data to enable pagination.
```
...
"list": "https://www.programmableweb.com/category/all/apis",
"pagination": {
  "selector": ".pager-last a@href",
  "limit": 5,
}
...
```
- list: The page to start the scraping
- pagination
  - selector: how to navigate to the next page
  - limit: How many pages to navigate (when not defined, there is no limit)


## Harvesting API data
The config file contains a "fields" section which identifies the data being scraped:
- header
- api
- content

This is also the [JSON output](../sample-out.json) from the Source step.
