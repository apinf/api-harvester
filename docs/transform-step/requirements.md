# Transform step
The Transform module takes JSON data in and matches it to a predefined datamodel. The output is again JSON.
Default values can be defined in case data is missing.

## CLI
The command line takes either a parameter that
- points to a folder (and then runs every config file in the folder) or
- points to a specific config file (and runs only that file)


## Input
The input is JSON.
[Sample input file](sampe-in.json)

## Output
The output is also JSON.
[Sample output file](sample-out.json)


## Config files
Config files match the input data to the correct datamodel. It can also define defaults in case data is missing.

[Sample config file][sample-programmableweb.json] for the programmableweb.com example.
