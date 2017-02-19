{
"items" : [{
    "displayName": "Articoli correlati",
    "showContent": true,
    "content":$input.json('$..entries[?(@.categories && !@.relateds)]')
}]
}    
    