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