class TweetCompose {
  constructor ($el) {
    this.$form = $el;
    this.charsLeft = $el.find('.chars-left');
    this.$textarea = $('textarea');
    $el.on('submit', this.submit.bind(this));
    this.$textarea.on('input', this.chars.bind(this));
    this.$addMentionedUser = $('.add-mentioned-user');
    this.$addMentionedUser.on('click', this.addMentionedUser.bind(this));
    // debugger;
  }

  addMentionedUser (event) {
    const tweetCompose = this;
    $('.add-mentioned-user').empty();
    if ($('select:last-child').val() != "") {
      tweetCompose.addSelectedListener();
    }
  }

  addSelectedListener () {
    const tweetCompose = this;
    let temp = $('.mentioned-users').append($('script[type="text/template"]').html());
    $('select:last-child').on('change', tweetCompose.addMentionedUser.bind(tweetCompose));
  }

  chars (event) {
    const MAX = 140;
    const tweetCompose = this;
    tweetCompose.charsLeft.text(`${MAX - this.$textarea.val().length} chars left`);
  }

  submit (event) {
    const tweetCompose = this;
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/tweets',
      dataType: 'json',
      data: this.$form.serialize(),
      success: function (tweet) {
        let content = tweet.content;
        let user = tweet.user.username;
        let createdAt = tweet.created_at;
        $('#feed').prepend($(`<li>${content} -- ${user} -- ${createdAt}</li>`));
        tweetCompose.clearForm();
      }
    });
  }

  clearForm () {
    this.$form.find("textarea").val("");
    this.$form.find("option").prop("selected", false);
  }
}

module.exports = TweetCompose;
