article class: "fortune", id: "fortune_#{@fortune.id}", ->
    h2 -> a href: "/fortune/#{@fortune.slug}", -> @fortune.title
    blockquote ->
        safe @helpers.fortunize @fortune.content
        br style: "clear:both"
    aside class: "fortune-infos", ->
        p ->
            safe "Posted by #{yield -> strong -> h @fortune.author} #{@helpers.timeAgoInWords @fortune.date} ago."
            span class: "fortune-actions", ->
                strong -> "#{@fortune.votes} votes"
                # <?php echo link_to('-', 'fortune_down', $fortune, array(
                #     'method' => 'put',
                #     'title'    => 'Vote down this fortune',
                # )) ?> /
                # <?php echo link_to('+', 'fortune_up', $fortune, array(
                #     'method' => 'put',
                #     'title'    => 'Vote up this fortune',
                # )) ?>