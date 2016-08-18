class FollowToggle {
  constructor($el) {
    this.userId = $el.data('user-id');
    this.followState = $el.data('follow-state').toString();
    this.$el = $el;
    this.processing = false;

    this.render();
    $el.on('click', this.handleClick.bind(this));
  }

  handleClick(event) {
    this.processing = true;
    if (this.processing) {
      this.$el.prop("disabled", true)
    }
    const followToggle = this;
    let reqMethod = 'POST';
    event.preventDefault();

    if (this.followState === 'followed') {
      reqMethod = 'DELETE';
      followToggle.state = 'unfollowing';
    }

    $.ajax({
      method: `${reqMethod}`,
      url: `/users/${this.userId}/follow`,
      dataType: 'json',
      data: {'user_id': `${this.userId}`},
      success(follow) {
        followToggle.followState = (followToggle.followState === 'followed') ? 'unfollowed' : 'followed';
        followToggle.render();
        followToggle.processing = false;
        followToggle.$el.prop("disabled", false);
      }
    });
  }

  render() {
    if (this.followState === 'unfollowed') {
      this.$el.text('Follow!');
    } else {
      this.$el.text('Unfollow!');
    }
  }

}

module.exports = FollowToggle;
