(function() {

  exports.fortunes = {
    f1: {
      title: "First fortune",
      content: "<niko> Hello!\n<dave> Hello.",
      votes: 10,
      comments: [
        {
          author: "John",
          email: "john@doe.com",
          content: "Yes?"
        }, {
          author: "Bob",
          email: "bob@doe.com",
          content: "Yes."
        }
      ]
    },
    f2: {
      title: "Second fortune",
      content: "<bob> I'm so happy this works\njoe enters the room\n<joe> Me neither actually.\njoe left the room",
      votes: 20
    }
  };

}).call(this);
