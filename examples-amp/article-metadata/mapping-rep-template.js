#set($allEntries = $input.json('$..entries[?(@.categories && !@.relateds)]'))
{
"items" : [{
    "displayName": "Dalla Home Page",
    "showContent": true,
    "showWebPublicationDate": true,
    "content":$allEntries[0,10]
}]
}        