p "By #{@comment.author} on " + @helpers.timeAgoInWords(@comment.date) + " ago:"
blockquote @comment.content