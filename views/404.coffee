h2 "Not found, dude."
p "The resource you requested could not be found."
if @err
    h3 "Technical details"
    blockquote @err.message