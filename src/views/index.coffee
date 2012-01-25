if @fortunes.length
    p "#{@fortunes.length} fortunes"
    for fortune in @fortunes
        partial '_fortune', fortune: fortune
        hr
else
    p "No fortune"