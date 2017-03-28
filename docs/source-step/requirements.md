# Source step

With the Source step, we aim to collect data from 3 different types of sources:
- Web scraping
- REST APIs
- CSV files

In scope:
- Web scraping module

Out of scope:
- REST APIs module
- CSV files module

## Output
The result of the source step is JSON.
[Sample file](sample-out.json) based on [Twitter API](https://www.programmableweb.com/api/twitter)

- header: input from webscraping
- api: input from webscraping
- content: input from webscraping
- timestamp: metadata - date and time when the scraping happened
- source: metadata - the webpage that got scraped

## Storage
The output does not need to be saved to disk. JSON gets passed on to the Transform step in memory.


## CLI
The command line takes either a parameter that
- points to a folder (and then runs every config file in the folder) or
- points to a specific config file (and runs only that file)



## Config files
The logic for the Source step datasources is saved in config files for each datasource.

### Web scraping
[Web scraping requirements](scraping/requirements.md)

### REST API
Out of scope

### CSV files
Out of scope
