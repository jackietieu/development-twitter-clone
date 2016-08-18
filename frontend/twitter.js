const FollowToggle = require('./follow_toggle.js');

$(() => {
  $.each($('button.follow-toggle'), (i, el) => {
    new FollowToggle($(el));
  });
});
