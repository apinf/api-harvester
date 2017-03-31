# Get list of X-Road APIs

Aim is to build harvester that is capable of harvesting X-Road APIs, but keeping in mind that this utility using REST API as a source for metadata is used in other contexts as well. Output for each API (JSON) is always the same. Only the logic for source might differ. We assume that there is always GET method to get list of APIs. From that list we get some kind of identified for the API and by using that as input for another GET method we can get the API metadata details. Below is more detailed explanation of the X-Road case.  

We can get the API list with GET call: https://liityntakatalogi.suomi.fi/api/3/action/package_list

It returns JSON:

```
{"help": "https://liityntakatalogi.suomi.fi/api/3/action/help_show?name=package_list", "success": true, "result": ["ajoneuvoliikennerekisteri", "kiinteistotietojarjestelma", "vtjkysely-sovelluskysely-hetuhaku"]} 
```
That JSON needs to be parsed and extract "result" content (array) from there. It is assumed that above resultset will always be comma separated array of API identifiers. (["ajoneuvoliikennerekisteri", "kiinteistotietojarjestelma", "vtjkysely-sovelluskysely-hetuhaku"]).  

The get information from one API we take the name of the API (each in the above array is name of an API), and put that as parameter to second GET method. In the below example we get JSON formatted details about "vtjkysely-sovelluskysely-hetuhaku".  

* https://liityntakatalogi.suomi.fi/api/3/action/package_search?q=vtjkysely-sovelluskysely-hetuhaku

That will return JSON: 
```

JSONLint
The JSON Validator
Try PRO →

{

    "help": "https://liityntakatalogi.suomi.fi/api/3/action/help_show?name=package_search",

    "success": true,

    "result": {

        "count": 1,

        "sort": "score desc, metadata_modified desc",

        "facets": {},

        "results": [{

            "notes_translated": {

                "fi": " VTJ-rajapinta (VTJkysely sovelluskysely) \"Henkil\u00f6tunnuksella haku\"\r\n\r\nVTJ-rajapinta on palvelu, jossa asiakkaan tietoj\u00e4rjestelm\u00e4 l\u00e4hett\u00e4\u00e4 yksitt\u00e4isen kyselyn v\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4\u00e4n. V\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4st\u00e4 palautetaan asiakkaan tietoj\u00e4rjestelm\u00e4lle XML-muotoinen vastaussanoma.\r\n\r\nV\u00c4EST\u00d6TIETOJ\u00c4RJESTELM\u00c4N PALVELUT - TIETOJEN K\u00c4YT\u00d6N EDELLYTYKSET\r\n\r\nV\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4n tiedot eiv\u00e4t ole julkisia, ja niiden k\u00e4ytt\u00f6 edellytt\u00e4\u00e4 aina V\u00e4est\u00f6rekisterikeskuksen k\u00e4ytt\u00e4j\u00e4organisaatiolle (viranomainen, yritys tai muu yhteis\u00f6) my\u00f6nt\u00e4m\u00e4\u00e4 tietolupaa sek\u00e4 k\u00e4ytt\u00e4j\u00e4organisaation sitoutumista luvan ehtoihin.\r\n\r\nV\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4n tietoja k\u00e4sitelt\u00e4ess\u00e4 on noudatettava v\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4st\u00e4 ja V\u00e4est\u00f6rekisterikeskuksen varmennepalveluista annettua lakia (661/2009) ja henkil\u00f6tietolakia (523/1999) sek\u00e4 muuta lains\u00e4\u00e4d\u00e4nt\u00f6\u00e4 ja viranomaisten m\u00e4\u00e4r\u00e4yksi\u00e4.\r\n\r\nV\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4st\u00e4 saatuja tietoja ei saa luovuttaa kolmannelle osapuolelle ilman V\u00e4est\u00f6rekisterikeskuksen tapauskohtaisesti my\u00f6nt\u00e4m\u00e4\u00e4 lupaa.\r\n\r\nV\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4st\u00e4 saatuja tietoja saa tallettaa omaan rekisteriin vain, mik\u00e4li k\u00e4ytt\u00e4j\u00e4organisaatiolla on siihen henkil\u00f6tietolain tai muun lain mukaan oikeus.\r\n\r\nV\u00e4est\u00f6rekisterikeskuksella on oikeus vaatia k\u00e4ytt\u00e4j\u00e4organisaatiolta kirjallinen selvitys tietojenk\u00e4sittelyn turvallisuuden j\u00e4rjestelyist\u00e4 mm. silloin, kun tietoja luovutetaan teknisen k\u00e4ytt\u00f6yhteyden avulla. Selvitys perustuu lakiin V\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4st\u00e4 ja V\u00e4est\u00f6rekisterikeskuksen varmennepalveluista 661/2001 44 \u00a7.\r\n\r\nVakiomuotoisten palvelujen k\u00e4yt\u00f6st\u00e4 ei veloiteta maksua niilt\u00e4 julkisoikeudellisilta yhteis\u00f6ilt\u00e4, jotka on m\u00e4\u00e4ritelty valtiovarainministeri\u00f6n antaman maksuasetuksen (1063/2014) 2 \u00a7:ss\u00e4. V\u00e4est\u00f6rekisterikeskus voi veloittaa palvelun k\u00e4ytt\u00f6\u00f6notosta erillisen maksun. Muilta julkisoikeudellisilta yhteis\u00f6ilt\u00e4 veloitetaan maksu em maksuasetuksen 3 \u00a7:n mukaisesti. Kaikilta julkisoikeudellisilta yhteis\u00f6ilt\u00e4 veloitetaan maksu erikseen r\u00e4\u00e4t\u00e4l\u00f6idyst\u00e4 asiakaskohtaisesta palvelusta. Yksityissektorin tietopalveluista veloitetaan V\u00e4est\u00f6rekisterikeskuksen liiketaloudellisten suoritteiden hinnoista annettuun p\u00e4\u00e4t\u00f6kseen (593/230/2011).\r\n\r\nLupaa v\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4n tietojen k\u00e4ytt\u00f6\u00f6n saamiseksi haetaan s\u00e4hk\u00f6isesti V\u00e4est\u00f6rekisterikeskukselta verkkoasioinnissa https://asiointi.vrk.fi. Keskeinen hakemuksessa selvitett\u00e4v\u00e4 asia on tietojen aiottu k\u00e4ytt\u00f6tarkoitus.\r\n\r\nTietopalvelut julkishallinnon yhteis\u00f6ille https://eevertti.vrk.fi/tietopalvelut-julkishallinnolle\r\n\r\nTietopalvelut yrityksille ja yhteis\u00f6ille https://eevertti.vrk.fi/tietopalvelut-yrityksille-ja-yhteisoille\r\n\r\nPalvelu toimii ymp\u00e4ri vuorokauden seitsem\u00e4n\u00e4 p\u00e4iv\u00e4n\u00e4 viikossa.",

                "en": "VTJ interface  \u201dQuery with personal identity code\u201d",

                "sv": "VTJ gr\u00e4nssnit \u201dS\u00f6kning med personbeteckning\""

            },

            "license_title": null,

            "maintainer": "V\u00e4est\u00f6rekisterikeskus ",

            "validSince": "2016-06-20",

            "relationships_as_object": [],

            "private": false,

            "maintainer_email": "vtjkysely@vrk.fi",

            "num_tags": 16,

            "shared_resource": "yes",

            "id": "FI.GOV.0245437-2.VTJkysely",

            "metadata_created": "2016-06-20T07:12:52.941174",

            "metadata_modified": "2017-03-31T04:45:32.198546",

            "author": null,

            "author_email": null,

            "environment": "",

            "state": "active",

            "version": null,

            "license_id": null,

            "type": "dataset",

            "resources": [{

                "cache_last_updated": null,

                "package_id": "FI.GOV.0245437-2.VTJkysely",

                "service_status": {},

                "availability": {},

                "size": null,

                "id": "0db14804-1c7f-480d-92ab-414c65ebb23a",

                "state": "active",

this is an AD →

Results

Valid JSON

Source is on GitHub. Props to Douglas Crockford of JSON and JS Lint and
Zach Carter, who provided the pure JS implementation of jsonlint.
FAQ Advertise
FAQ
What is JSONLint?

JSONLint is a validator and reformatter for JSON, a lightweight data-interchange format.
Why 'Lint'?

Essentially, I'm just riding on JSLint's coattails. The name 'lint' was originally used to find problems in C source files. It's not really valid here because JSON is just a protocol. Shameless? You bet!
Why does it reformat my JSON?

Because your code is ugly! Trust me on this one. What's that you say? It's not? Ok, well then here's JSON Lint without the reformatter.
Any secret features?

Sure, a few. You can input a URL and it'll scrape it for JSON and parse that.
An example URL to test: http://www.reddit.com/r/programming/comments/9szpc/jsonlint_a_handy_json_validator_and_reformatter.json

You can also provide JSON to lint in the URL if you link to JSON Lint with the "json" parameter. Here's an example URL to test.

Additionally, JSON Lint can also be used as a json compressor if you add ?reformat=compress to the URL.
What are some common errors?

Expecting 'STRING'
    You probably have an extra comma at the end of your collection. Something like: { "a": "b", } 
Expecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '['
    You probably have an extra comma at the end of your list. Something like: [ "a", "b", ]
    You also may have not enclosed your collection keys in quotes. Proper format for a collection is: { "key": "value" } 

Be sure to follow JSON's syntax properly. For example, always use double quotes, always quotify your keys, and remove all callback functions.
A friend and I pasted the same JSON in and got different results. Wat do?

If you and your friend are on different systems (Win/Unix), this is possible due to the way windows handles newlines. Essentially, if you have just newline characters (\n) in your JSON and paste it into JSONLint from a windows machine, it can validate it as valid erroneously since Windows may need a carriage return (\r) as well to detect newlines properly.

The solution: Either use direct URL input, or make sure your content's newlines match the architecture your system expects!
I've got feedback!
Great - hit us up on GitHub.

```
## Output
For each API we need the same JSON formatted [OUT data set defined here](https://github.com/apinf/api-harvester/blob/master/data-models-as-json.md) 
