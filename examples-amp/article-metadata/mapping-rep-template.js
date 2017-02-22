##"content":$input.json('$..entries[?(@.categories && !@.relateds)]')
#set($allEntries = $input.json('$..entries[?(@.categories && !@.relateds)]'))
{
"items" : [{
    "displayName": "Dalla Home Page",
    "showContent": true,
    "showWebPublicationDate": true,
    "content":{
		#foreach($key in $allEntries.keySet())
		"$key" : "$util.escapeJavaScript($allEntries.get($key))"
		    #if($velocityCount>9),#end
		#end
	}
}]
} 

## http://docs.aws.amazon.com/apigateway/latest/developerguide/example-photos.html
 {
        "updated": "2017-02-15T16:38:29Z",
        "target_links": "<a title=\"http://video.repubblica.it/politica/direzione-pd-emiliano--saro-candidato-a-segreteria-e-necessario/267718/268111\" class=\"Video\" href=\"http://video.repubblica.it/politica/direzione-pd-emiliano--saro-candidato-a-segreteria-e-necessario/267718/268111\">Emiliano: &quot;Sar&ograve; candidato a segreteria&quot;</a> <a class=\"Articolo\" title=\"http://www.huffingtonpost.it/lucia-annunziata/la-verita-non-detta_b_14737692.html\" href=\"http://www.huffingtonpost.it/lucia-annunziata/la-verita-non-detta_b_14737692.html\"><strong>HUFFPOST</strong> La verit&agrave; non detta <em class=\"author\">di LUCIA ANNUNZIATA</em></a><em class=\"author\"> </em> <a title=\"http://www.repubblica.it/politica/2017/02/14/news/nella_gabbia_dell_estinzione-158258406/?ref=HRER2-2\" href=\"http://www.repubblica.it/politica/2017/02/14/news/nella_gabbia_dell_estinzione-158258406/?ref=HRER2-2\"><strong>&middot; L'analisi</strong> Nella gabbia dell'estinzione</a> <em class=\"author\">di CLAUDIO TITO&nbsp;</em><a title=\"http://www.repubblica.it/politica/2017/02/14/news/movimenti_a_sinistra_fra_scissioni_e_nuovi_partiti-158276133/\" class=\"Articolo\" href=\"http://www.repubblica.it/politica/2017/02/14/news/movimenti_a_sinistra_fra_scissioni_e_nuovi_partiti-158276133/\"> La sciarada a sinistra</a> <em class=\"author\">di MONICA RUBINO</em><a title=\"http://video.repubblica.it/politica/futuro-prossimo-l-incontro-con-laura-boldrini-e-giuliano-pisapia-la-diretta/267812/268219?video\" href=\"http://video.repubblica.it/politica/futuro-prossimo-l-incontro-con-laura-boldrini-e-giuliano-pisapia-la-diretta/267812/268219?video\"> </a>",
        "links": [
            {
                "href": "http://ws.kpm3.kataweb.it/kpm3-ws-rep-locali/repubblica/content/158386581",
                "id": "158386581",
                "rel": "edit"
            },
            {
                "text": "",
                "pos": 1,
                "ctype": "Articolo",
                "href": "http://ws.kpm3.kataweb.it/kpm3-ws-rep-locali/repubblica/content/158347877",
                "rel": "related",
                "id": "158347877"
            },
            {
                "text": "",
                "pos": 1,
                "ctype": "Media",
                "href": "http://ws.kpm3.kataweb.it/kpm3-ws-rep-locali/repubblica/content/158359973",
                "rel": "related",
                "id": "158359973",
                "first": "true"
            },
            {
                "path": "/repubblica/repubblica/",
                "term": "/repubblica",
                "href": "https://kpm3.kataweb.it/kpm3-fe-repubblica/delivery/rep-locali/repubblica/repubblica/",
                "rel": "alternate"
            }
        ],
        "created": "2017-02-14T15:01:00Z",
        "media": [
            {
                "mimeType": "image/jpeg",
                "pos": 1,
                "hd_summary": " PIERLUIGI BERSANI E MATTEO RENZI                 ANSA/ MAURIZIO DEGL'INNOCENTI",
                "width": "156",
                "otheralternate": {
                    "70x70": {
                        "mimeType": "image/jpeg",
                        "width": "70",
                        "href": "http://www.repstatic.it/content/nazionale/img/2017/02/15/122418785-9550b77b-f233-4d1e-82f7-f6cd4a62e5b2.jpg",
                        "summary": "70x70",
                        "height": "70"
                    },
                    "390x260": {
                        "mimeType": "image/jpeg",
                        "width": "390",
                        "href": "http://www.repstatic.it/content/nazionale/img/2017/02/15/122419229-75b41e55-952d-4e6c-9e06-570d466f80c2.jpg",
                        "summary": "390x260",
                        "height": "260"
                    },
                    "156x156": {
                        "mimeType": "image/jpeg",
                        "width": "156",
                        "href": "http://www.repstatic.it/content/nazionale/img/2017/02/15/122418355-bb5cd889-e80d-409f-baa7-5cfcb4fdccee.jpg",
                        "summary": "156x156",
                        "height": "156"
                    }
                },
                "href": "http://www.repstatic.it/content/nazionale/img/2017/02/15/122418355-bb5cd889-e80d-409f-baa7-5cfcb4fdccee.jpg",
                "kpm3id": "158359973",
                "height": "156",
                "type": "media"
            }
        ],
        "title": "Pd, Renzi: &quot;E' incredibile  avere paura del Congresso&quot;. Ma la minoranza attacca: &quot;Ormai &egrave; partito personale&quot;",
        "summary": "<a class=\"Articolo\" title=\"http://www.repubblica.it/politica/2017/02/15/news/e_briatore_aiuta_matteo_a_ricucire_con_trump_ho_favorito_una_telefonata_tra_due_amici_-158332742/\" href=\"http://www.repubblica.it/politica/2017/02/15/news/e_briatore_aiuta_matteo_a_ricucire_con_trump_ho_favorito_una_telefonata_tra_due_amici_-158332742/\"><strong>&middot; La storia</strong> Briatore aiuta Matteo a ricucire con Trump</a>",
        "title2": "<a class=\"Articolo\" title=\"http://www.repubblica.it/politica/2017/02/14/news/pd_bersani_scissione_avvenuta-158299933/\" href=\"http://www.repubblica.it/politica/2017/02/14/news/pd_bersani_scissione_avvenuta-158299933/\">&middot; Bersani: &quot;La scissione c'&egrave; gi&agrave;&quot;</a> <a title=\"http://video.repubblica.it/politica/pd-bersani-la-scissione-nel-nostro-popolo-e-gia-avvenuta/267830/268235?video\" href=\"http://video.repubblica.it/politica/pd-bersani-la-scissione-nel-nostro-popolo-e-gia-avvenuta/267830/268235?video\"><strong>video</strong></a> <a title=\"http://www.repubblica.it/politica/2017/02/15/news/titolo_non_esportato_da_hermes_-_id_articolo_6041344-158332626/\" class=\"Articolo\" href=\"http://www.repubblica.it/politica/2017/02/15/news/titolo_non_esportato_da_hermes_-_id_articolo_6041344-158332626/\"><strong>&middot; Mauro</strong>: I dem e la talpa dell'ultradestra</a> <a title=\"http://video.repubblica.it/politica/folli-la-schizofrenia-incomprensibile-del-pd/267860/268264\" href=\"http://video.repubblica.it/politica/folli-la-schizofrenia-incomprensibile-del-pd/267860/268264\"><strong>&middot; Rep Tv</strong> Folli: schizofrenia incomprensibile</a>",
        "href": "http://www.repubblica.it/politica/2017/02/15/news/orfini_reggera_il_pd_fino_al_congresso_vertice_notturno_dei_big_al_nazareno_per_trattare_con_la_minoranza_ed_evitare_la_sci-158347877/",
        "kpm3id": "158386581",
        "headline_id": "rep-locali:repubblica:158386581",
        "categories": [
            {
                "term": "/repubblica",
                "layout": "default",
                "zone": "apertura",
                "sequence": "1",
                "label": "Repubblica",
                "attributes": {
                    "media-enabled": "true"
                },
                "refid": "158300071",
                "block": "4"
            }
        ]
    }       