(function() {

  p(("By " + this.comment.author + " on ") + this.helpers.timeAgoInWords(this.comment.date) + " ago:");

  blockquote(this.comment.content);

}).call(this);
