# Get list of X-Road APIs

Aim is to build harvester that is capable of harvesting X-Road APIs, but keeping in mind that this utility using REST API as a source for metadata is used in other contexts as well. Output for each API (JSON) is always the same. Only the logic for source might differ. We assume that there is always GET method to get list of APIs. From that list we get some kind of identified for the API and by using that as input for another GET method we can get the API metadata details. Below is more detailed explanation of the X-Road case.  

We can get the API list with GET call: https://liityntakatalogi.suomi.fi/api/3/action/package_list

It returns JSON:

```
{
	"help": "https://liityntakatalogi.suomi.fi/api/3/action/help_show?name=package_list",
	"success": true,
	"result": ["ajokorttitiedot", "aloitepalvelut", "atvarvojoukotrajapinta", "atventiteettirajapinnat", "atvreferenssitietopalvelu", "atvyhdistelmarajapinnat", "hsywatermsystem", "infraservices", "kirjaamisosatietopalvelu", "kkysely", "kyllapito", "omatajoneuvot", "omatveneet", "palveluvayla", "rolesauthsservice", "virta-otp", "voimassaolopalvelu", "vrkclient", "vtjkysely", "vtjyllapito", "xroadvirre-services", "xroadytj-services"]
}
```
That JSON needs to be parsed and extract "result" content (array) from there. It is assumed that above resultset will always be comma separated array of API identifiers. (["ajoneuvoliikennerekisteri", "kiinteistotietojarjestelma", "vtjkysely-sovelluskysely-hetuhaku"]).  

The get information from one API we take the name of the API (each in the above array is name of an API), and put that as parameter to second GET method. In the below example we get JSON formatted details about "vtjkysely-sovelluskysely-hetuhaku".  

* https://liityntakatalogi.suomi.fi/api/3/action/package_search?q=vtjkysely-sovelluskysely-hetuhaku

That will return JSON:
```

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
				"type": {},
				"hash": "",
				"description": "",
				"format": "WSDL",
				"description_translated": {},
				"connection_information": {},
				"last_modified": "2017-03-31T04:45:32.177295",
				"url_type": "upload",
				"valid_content": "yes",
				"mimetype": null,
				"cache_url": null,
				"name": "HaeTuotteenSkeema.v1",
				"created": "2016-06-20T07:12:53.052981",
				"url": "https://liityntakatalogi.suomi.fi/dataset/FI.GOV.0245437-2.VTJkysely/resource/0db14804-1c7f-480d-92ab-414c65ebb23a/download/service.wsdl",
				"mimetype_inner": null,
				"position": 0,
				"revision_id": "f8334c3e-f9c7-4d1f-b863-65a83f95a88f",
				"sla": {},
				"resource_type": null
			}, {
				"cache_last_updated": null,
				"package_id": "FI.GOV.0245437-2.VTJkysely",
				"service_status": {},
				"availability": {},
				"size": null,
				"id": "d125f511-346d-40b2-affd-262b8d8c3f5e",
				"state": "active",
				"type": {},
				"hash": "",
				"description": "",
				"format": "WSDL",
				"description_translated": {},
				"connection_information": {},
				"last_modified": "2017-03-31T04:45:31.815342",
				"url_type": "upload",
				"valid_content": "yes",
				"mimetype": null,
				"cache_url": null,
				"name": "HenkilonTunnusKysely.v1",
				"created": "2016-06-20T07:12:53.197972",
				"url": "https://liityntakatalogi.suomi.fi/dataset/FI.GOV.0245437-2.VTJkysely/resource/d125f511-346d-40b2-affd-262b8d8c3f5e/download/service.wsdl",
				"mimetype_inner": null,
				"position": 1,
				"revision_id": "f8334c3e-f9c7-4d1f-b863-65a83f95a88f",
				"sla": {},
				"resource_type": null
			}, {
				"cache_last_updated": null,
				"csrf-token": "9BaN2wVwAyaJmMJTTIhZHEPfPe_fXGn5_1Y0m3_xTAQhXTUpMpb4vIQz9N1oKp9fBUbwBRRFEwuhvNhOgycN5g==",
				"package_id": "FI.GOV.0245437-2.VTJkysely",
				"service_status": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"availability": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"size": null,
				"chargeability": "",
				"id": "0673bd21-e079-4491-8985-77da4aad579d",
				"state": "active",
				"type": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"hash": "",
				"description": "Henkil\u00f6tunnuksella kysely tehd\u00e4\u00e4n k\u00e4ytt\u00e4m\u00e4ll\u00e4 WSDL-kuvauksessa olevaa TeeHenkilonTunnusKysely \u2013 metodia.\r\n\r\nPakolliset hakuparametrit ovat SoSoNimi, Kayttajatunnus, Salasana, Loppukayttaja ja Henkilotunnus.\r\n\r\nSoSoNimi on V\u00e4est\u00f6rekisterikeskuksen (VRK) kanssa tietoluvassa sovittu palvelun nimi.\r\n\r\nKayttajatunnus ja Salasana ovat palveluun oikeuttavat tunnukset, jotka annetaan asiakkaalle tietolupap\u00e4\u00e4t\u00f6ksen j\u00e4lkeen.\r\n\r\nLoppukayttaja \u2013tietona on l\u00e4hett\u00e4v\u00e4 varsinaisen kyselyn tekij\u00e4n yksil\u00f6iv\u00e4 tunnistetieto (max. 50 merkki\u00e4).\r\n\r\nTunnistetiedon perusteella asiakkaan on pystytt\u00e4v\u00e4 selvitt\u00e4m\u00e4\u00e4n VRK:lle viisi vuotta kyselyhetkest\u00e4 eteenp\u00e4in kuka kyselyn on tehnyt.\r\n",
				"format": "XML",
				"description_translated": {
					"fi": "Henkil\u00f6tunnuksella kysely tehd\u00e4\u00e4n k\u00e4ytt\u00e4m\u00e4ll\u00e4 WSDL-kuvauksessa olevaa TeeHenkilonTunnusKysely \u2013 metodia.\r\n\r\nPakolliset hakuparametrit ovat SoSoNimi, Kayttajatunnus, Salasana, Loppukayttaja ja Henkilotunnus.\r\n\r\nSoSoNimi on V\u00e4est\u00f6rekisterikeskuksen (VRK) kanssa tietoluvassa sovittu palvelun nimi.\r\n\r\nKayttajatunnus ja Salasana ovat palveluun oikeuttavat tunnukset, jotka annetaan asiakkaalle tietolupap\u00e4\u00e4t\u00f6ksen j\u00e4lkeen.\r\n\r\nLoppukayttaja \u2013tietona on l\u00e4hett\u00e4v\u00e4 varsinaisen kyselyn tekij\u00e4n yksil\u00f6iv\u00e4 tunnistetieto (max. 50 merkki\u00e4).\r\n\r\nTunnistetiedon perusteella asiakkaan on pystytt\u00e4v\u00e4 selvitt\u00e4m\u00e4\u00e4n VRK:lle viisi vuotta kyselyhetkest\u00e4 eteenp\u00e4in kuka kyselyn on tehnyt.\r\n",
					"en": "",
					"sv": ""
				},
				"connection_information": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"mimetype_inner": null,
				"url_type": "upload",
				"response_time": "",
				"mimetype": null,
				"cache_url": null,
				"name": "Hakuparametrit",
				"created": "2016-06-20T11:29:19.838406",
				"url": "https://liityntakatalogi.suomi.fi/dataset/FI.GOV.0245437-2.VTJkysely/resource/0673bd21-e079-4491-8985-77da4aad579d/download/hakuparametrit.xml",
				"last_modified": "2016-06-20T11:29:19.783919",
				"position": 2,
				"revision_id": "b00a414c-b8bb-4736-80fd-4b28d78c8bc0",
				"sla": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"resource_type": null
			}, {
				"cache_last_updated": null,
				"csrf-token": "9BaN2wVwAyaJmMJTTIhZHEPfPe_fXGn5_1Y0m3_xTAQhXTUpMpb4vIQz9N1oKp9fBUbwBRRFEwuhvNhOgycN5g==",
				"package_id": "FI.GOV.0245437-2.VTJkysely",
				"service_status": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"availability": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"size": null,
				"chargeability": "",
				"id": "703f73b3-0280-4732-aa34-673652a1359c",
				"state": "active",
				"type": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"hash": "",
				"description": "T\u00e4m\u00e4 skeema kuvaa henkil\u00f6tiedoissa esiintyv\u00e4t XML-tietotyypit mahdollisine arvoineen.",
				"format": "XSD",
				"description_translated": {
					"fi": "T\u00e4m\u00e4 skeema kuvaa henkil\u00f6tiedoissa esiintyv\u00e4t XML-tietotyypit mahdollisine arvoineen.",
					"en": "",
					"sv": ""
				},
				"connection_information": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"mimetype_inner": null,
				"url_type": "upload",
				"response_time": "",
				"mimetype": null,
				"cache_url": null,
				"name": "VTJSovelluskyselyn henkil\u00f6tietokatalogi",
				"created": "2016-06-20T11:30:21.443391",
				"url": "https://liityntakatalogi.suomi.fi/dataset/FI.GOV.0245437-2.VTJkysely/resource/703f73b3-0280-4732-aa34-673652a1359c/download/vtjhenkilotiedotkatalogi.xsd",
				"last_modified": "2016-06-20T11:30:21.386867",
				"position": 3,
				"revision_id": "d4571a94-ac74-4913-8972-d2768ee383f5",
				"sla": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"resource_type": null
			}, {
				"cache_last_updated": null,
				"csrf-token": "9BaN2wVwAyaJmMJTTIhZHEPfPe_fXGn5_1Y0m3_xTAQhXTUpMpb4vIQz9N1oKp9fBUbwBRRFEwuhvNhOgycN5g==",
				"package_id": "FI.GOV.0245437-2.VTJkysely",
				"service_status": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"availability": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"size": null,
				"chargeability": "",
				"id": "f2bf15c6-bd19-4d1e-85f9-678a1b203c2c",
				"state": "active",
				"type": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"hash": "",
				"description": "VTJkysely Sovelluskysely \"Haku henkil\u00f6tunnuksella\" vastaussanoman skeema",
				"format": "XSD",
				"description_translated": {
					"fi": "VTJkysely Sovelluskysely \"Haku henkil\u00f6tunnuksella\" vastaussanoman skeema",
					"en": "",
					"sv": ""
				},
				"connection_information": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"mimetype_inner": null,
				"url_type": "upload",
				"response_time": "",
				"mimetype": null,
				"cache_url": null,
				"name": "Vastaussanoman skeema",
				"created": "2016-06-20T11:33:54.170764",
				"url": "https://liityntakatalogi.suomi.fi/dataset/FI.GOV.0245437-2.VTJkysely/resource/f2bf15c6-bd19-4d1e-85f9-678a1b203c2c/download/peruslt1vastausskeema.xsd",
				"last_modified": "2016-06-20T11:33:54.112284",
				"position": 4,
				"revision_id": "d454c7c2-89cc-42ae-adf7-a2dade9a6033",
				"sla": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"resource_type": null
			}, {
				"cache_last_updated": null,
				"csrf-token": "9BaN2wVwAyaJmMJTTIhZHEPfPe_fXGn5_1Y0m3_xTAQhXTUpMpb4vIQz9N1oKp9fBUbwBRRFEwuhvNhOgycN5g==",
				"package_id": "FI.GOV.0245437-2.VTJkysely",
				"service_status": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"availability": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"size": null,
				"chargeability": "",
				"id": "a4901e6e-e9b0-4ff1-a87f-c7cf393293b4",
				"state": "active",
				"type": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"hash": "",
				"description": "VTJkysely Sovelluskysely \"Haku henkil\u00f6tunnuksella\" vastaussanoman skeema",
				"format": "XML",
				"description_translated": {
					"fi": "VTJkysely Sovelluskysely \"Haku henkil\u00f6tunnuksella\" vastaussanoman skeema",
					"en": "",
					"sv": ""
				},
				"connection_information": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"mimetype_inner": null,
				"url_type": "upload",
				"response_time": "",
				"mimetype": null,
				"cache_url": null,
				"name": "Esimerkki vastaussanomasta",
				"created": "2016-06-20T11:34:54.458155",
				"url": "https://liityntakatalogi.suomi.fi/dataset/FI.GOV.0245437-2.VTJkysely/resource/a4901e6e-e9b0-4ff1-a87f-c7cf393293b4/download/peruslt1esimerkkivastaus.xml",
				"last_modified": "2016-06-20T11:34:54.401033",
				"position": 5,
				"revision_id": "155b8781-57f8-4478-93e4-7d09547f90fb",
				"sla": {
					"fi": "",
					"en": "",
					"sv": ""
				},
				"resource_type": null
			}],
			"maintainer_phone": "0295 535 001",
			"num_resources": 6,
			"tags": [{
				"vocabulary_id": null,
				"state": "active",
				"display_name": "Tietopalvelut",
				"id": "1dac57ed-b2b1-4979-8d4d-3c2078ba2e74",
				"name": "Tietopalvelut"
			}, {
				"vocabulary_id": null,
				"state": "active",
				"display_name": "VTJ-rajapinta",
				"id": "0d99764b-7100-4a7e-b944-0ea5aa9bf1e5",
				"name": "VTJ-rajapinta"
			}, {
				"vocabulary_id": null,
				"state": "active",
				"display_name": "VTJKysely Sovelluskysely",
				"id": "53efa19f-d7a7-4ed2-a2d4-80c4f9c33e8a",
				"name": "VTJKysely Sovelluskysely"
			}, {
				"vocabulary_id": null,
				"state": "active",
				"display_name": "VTJkysely",
				"id": "8c227823-bf1e-4849-9649-57f5ef26037e",
				"name": "VTJkysely"
			}, {
				"vocabulary_id": null,
				"state": "active",
				"display_name": "V\u00e4est\u00f6rekisterikeskus",
				"id": "febc3a38-0801-4b8f-9063-53a664a05b3b",
				"name": "V\u00e4est\u00f6rekisterikeskus"
			}, {
				"vocabulary_id": null,
				"state": "active",
				"display_name": "henkil\u00f6tiedot",
				"id": "c9c88a22-45df-4569-bf61-38b2ad07318a",
				"name": "henkil\u00f6tiedot"
			}, {
				"vocabulary_id": null,
				"state": "active",
				"display_name": "henkil\u00f6tunnus",
				"id": "843296ff-7457-4389-8685-451ca1cccd87",
				"name": "henkil\u00f6tunnus"
			}, {
				"vocabulary_id": null,
				"state": "active",
				"display_name": "hetu",
				"id": "2ed33685-fb69-4ff3-93ae-c3df0f332cd0",
				"name": "hetu"
			}, {
				"vocabulary_id": null,
				"state": "active",
				"display_name": "rajapinta",
				"id": "e0666335-4c31-4d5b-b60a-7bf6dea52f35",
				"name": "rajapinta"
			}, {
				"vocabulary_id": null,
				"state": "active",
				"display_name": "soso",
				"id": "774fc4a1-0e6f-483c-9f3d-71bfa635e60b",
				"name": "soso"
			}, {
				"vocabulary_id": null,
				"state": "active",
				"display_name": "sosokysely",
				"id": "ede49d3d-48bd-4c02-a99a-09db6c7759ff",
				"name": "sosokysely"
			}, {
				"vocabulary_id": null,
				"state": "active",
				"display_name": "sovelluskysely",
				"id": "58099359-d4e5-4803-8afe-165dbdfe6a51",
				"name": "sovelluskysely"
			}, {
				"vocabulary_id": null,
				"state": "active",
				"display_name": "tietopalvelu",
				"id": "16bc38f7-da9b-4031-b5b6-437ea93dbbee",
				"name": "tietopalvelu"
			}, {
				"vocabulary_id": null,
				"state": "active",
				"display_name": "vrk",
				"id": "695499c6-f5bb-4bfa-aaa9-449e1dcad39d",
				"name": "vrk"
			}, {
				"vocabulary_id": null,
				"state": "active",
				"display_name": "vtj",
				"id": "ed69d92e-024b-411b-93c4-8b491d8ff4f6",
				"name": "vtj"
			}, {
				"vocabulary_id": null,
				"state": "active",
				"display_name": "v\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4",
				"id": "ce2e5edb-6d06-4946-9512-1343ac42085f",
				"name": "v\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4"
			}],
			"groups": [],
			"creator_user_id": "5b446027-eba1-4cc6-b07a-a93839aea1d0",
			"relationships_as_subject": [],
			"organization": {
				"description": "V\u00e4est\u00f6rekisterikeskus vastaa v\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4n tietopalvelusta viranomaisille sek\u00e4 useille yrityksille.\r\n\r\nV\u00e4est\u00f6rekisterikeskus toteuttaa yhdess\u00e4 valtiovarainministeri\u00f6n kanssa kansallista palveluarkkitehtuuria.\r\n\r\nVuonna 1969 perustettu V\u00e4est\u00f6rekisterikeskus toimii valtiovarainministeri\u00f6n hallinnonalalla.\r\n\r\nhttp://www.vrk.fi\r\n\r\nBefolkningsregistercentralen levererar en informationstj\u00e4nst som g\u00e4ller befolkningsdatasystemet till myndigheterna och till m\u00e5nga f\u00f6retag.\r\n\r\nBefolkningsregistercentralen genomf\u00f6r tillsammans med finansministeriet den nationella servicearkitekturen.\r\n\r\nBefolkningsregistercentralen inr\u00e4ttades \u00e5r 1969 och lyder under finansministeriet.\r\n\r\nhttp://vrk.fi/default.aspx?site=5\r\n\r\nTogether with the local register offices, the Population Register Centre is the data controller for the Finnish Population Information System. The PRC maintains and develops the Population Information System, its data and data quality as well as certified electronic services.\r\n\r\nThe Population Register Centre implements together with the Ministry of Finance the National Architecture for Digital Services.\r\n\r\nThe Population Register Centre was founded in 1969 and it operates under the Ministry of Finance.\r\n\r\nhttp://vrk.fi/default.aspx?site=4",
				"created": "2016-06-20T07:06:15.519856",
				"title": "VRK",
				"name": "vrk",
				"is_organization": true,
				"state": "active",
				"image_url": "2016-06-20-111247.2792362015-11-17-073313.006288VRKlogoFIRGB.jpg",
				"revision_id": "0aa2935b-0b29-44f1-ab31-0b46495cc673",
				"type": "organization",
				"id": "FI.GOV.0245437-2",
				"approval_status": "approved"
			},
			"name": "vtjkysely",
			"isopen": false,
			"url": "https://eevertti.vrk.fi/tietopalvelut-julkishallinnolle",
			"notes": " VTJ-rajapinta (VTJkysely sovelluskysely) \"Henkil\u00f6tunnuksella haku\"\r\n\r\nVTJ-rajapinta on palvelu, jossa asiakkaan tietoj\u00e4rjestelm\u00e4 l\u00e4hett\u00e4\u00e4 yksitt\u00e4isen kyselyn v\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4\u00e4n. V\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4st\u00e4 palautetaan asiakkaan tietoj\u00e4rjestelm\u00e4lle XML-muotoinen vastaussanoma.\r\n\r\nV\u00c4EST\u00d6TIETOJ\u00c4RJESTELM\u00c4N PALVELUT - TIETOJEN K\u00c4YT\u00d6N EDELLYTYKSET\r\n\r\nV\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4n tiedot eiv\u00e4t ole julkisia, ja niiden k\u00e4ytt\u00f6 edellytt\u00e4\u00e4 aina V\u00e4est\u00f6rekisterikeskuksen k\u00e4ytt\u00e4j\u00e4organisaatiolle (viranomainen, yritys tai muu yhteis\u00f6) my\u00f6nt\u00e4m\u00e4\u00e4 tietolupaa sek\u00e4 k\u00e4ytt\u00e4j\u00e4organisaation sitoutumista luvan ehtoihin.\r\n\r\nV\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4n tietoja k\u00e4sitelt\u00e4ess\u00e4 on noudatettava v\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4st\u00e4 ja V\u00e4est\u00f6rekisterikeskuksen varmennepalveluista annettua lakia (661/2009) ja henkil\u00f6tietolakia (523/1999) sek\u00e4 muuta lains\u00e4\u00e4d\u00e4nt\u00f6\u00e4 ja viranomaisten m\u00e4\u00e4r\u00e4yksi\u00e4.\r\n\r\nV\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4st\u00e4 saatuja tietoja ei saa luovuttaa kolmannelle osapuolelle ilman V\u00e4est\u00f6rekisterikeskuksen tapauskohtaisesti my\u00f6nt\u00e4m\u00e4\u00e4 lupaa.\r\n\r\nV\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4st\u00e4 saatuja tietoja saa tallettaa omaan rekisteriin vain, mik\u00e4li k\u00e4ytt\u00e4j\u00e4organisaatiolla on siihen henkil\u00f6tietolain tai muun lain mukaan oikeus.\r\n\r\nV\u00e4est\u00f6rekisterikeskuksella on oikeus vaatia k\u00e4ytt\u00e4j\u00e4organisaatiolta kirjallinen selvitys tietojenk\u00e4sittelyn turvallisuuden j\u00e4rjestelyist\u00e4 mm. silloin, kun tietoja luovutetaan teknisen k\u00e4ytt\u00f6yhteyden avulla. Selvitys perustuu lakiin V\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4st\u00e4 ja V\u00e4est\u00f6rekisterikeskuksen varmennepalveluista 661/2001 44 \u00a7.\r\n\r\nVakiomuotoisten palvelujen k\u00e4yt\u00f6st\u00e4 ei veloiteta maksua niilt\u00e4 julkisoikeudellisilta yhteis\u00f6ilt\u00e4, jotka on m\u00e4\u00e4ritelty valtiovarainministeri\u00f6n antaman maksuasetuksen (1063/2014) 2 \u00a7:ss\u00e4. V\u00e4est\u00f6rekisterikeskus voi veloittaa palvelun k\u00e4ytt\u00f6\u00f6notosta erillisen maksun. Muilta julkisoikeudellisilta yhteis\u00f6ilt\u00e4 veloitetaan maksu em maksuasetuksen 3 \u00a7:n mukaisesti. Kaikilta julkisoikeudellisilta yhteis\u00f6ilt\u00e4 veloitetaan maksu erikseen r\u00e4\u00e4t\u00e4l\u00f6idyst\u00e4 asiakaskohtaisesta palvelusta. Yksityissektorin tietopalveluista veloitetaan V\u00e4est\u00f6rekisterikeskuksen liiketaloudellisten suoritteiden hinnoista annettuun p\u00e4\u00e4t\u00f6kseen (593/230/2011).\r\n\r\nLupaa v\u00e4est\u00f6tietoj\u00e4rjestelm\u00e4n tietojen k\u00e4ytt\u00f6\u00f6n saamiseksi haetaan s\u00e4hk\u00f6isesti V\u00e4est\u00f6rekisterikeskukselta verkkoasioinnissa https://asiointi.vrk.fi. Keskeinen hakemuksessa selvitett\u00e4v\u00e4 asia on tietojen aiottu k\u00e4ytt\u00f6tarkoitus.\r\n\r\nTietopalvelut julkishallinnon yhteis\u00f6ille https://eevertti.vrk.fi/tietopalvelut-julkishallinnolle\r\n\r\nTietopalvelut yrityksille ja yhteis\u00f6ille https://eevertti.vrk.fi/tietopalvelut-yrityksille-ja-yhteisoille\r\n\r\nPalvelu toimii ymp\u00e4ri vuorokauden seitsem\u00e4n\u00e4 p\u00e4iv\u00e4n\u00e4 viikossa.",
			"owner_org": "FI.GOV.0245437-2",
			"extras": [{
				"key": "harvest_object_id",
				"value": "cabd51c1-f9cb-41ec-89e7-695668941343"
			}, {
				"key": "harvest_source_id",
				"value": "589abc9f-dd5f-4f10-8c3a-976d44b46503"
			}, {
				"key": "harvest_source_title",
				"value": "Palveluv\u00e4yl\u00e4"
			}],
			"title": "VTJ-rajapinta \"Henkil\u00f6tunnuksella haku\"",
			"revision_id": "f97946c7-915e-4a30-9da2-51268b9ff198"
		}],
		"search_facets": {}
	}
}

```
## Output
For each API we need the same JSON formatted [OUT data set defined here](https://github.com/apinf/api-harvester/blob/master/data-models-as-json.md)
