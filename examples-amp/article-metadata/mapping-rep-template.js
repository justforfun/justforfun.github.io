{
"items" : $input.json('$..entries[?(@.categories && !@.relateds)]')
}