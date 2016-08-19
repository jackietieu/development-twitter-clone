const FollowToggle = require('./follow_toggle.js');

class UsersSearch {
  constructor ($el) {
    this.$el = $el;
    this.$input = $el.find("input[type='text']");
    this.$ul = $el.find('ul');

    this.$input.on('input', this.handleInput.bind(this));
  }

  handleInput(event) {
    const usersSearch = this;

    $.ajax({
      method: 'GET',
      url: `/users/search`,
      dataType: 'json',
      data: { query: `${usersSearch.$input.val()}` },
      success(search) {
        usersSearch.render(search);
      }
    });
  }

  render (search) {
    this.$ul.empty();
    search.forEach((el, i) => {
      let user = $('<li></li>');
      user.text(`${i}: ${el.username}`);
      let button = $(`<button type="button" class="follow-toggle" data-user-id="${el.id}" data-follow-state="${el.followed ? "followed" : "unfollowed"}"></button>`);
      user.append(button);
      this.$ul.append(user);
      new FollowToggle(button);
    });
  }
}

module.exports = UsersSearch;
