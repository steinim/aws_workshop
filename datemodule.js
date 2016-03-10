module.exports = {
  getDayOfMonth: function() {
    return (new Date()).getDate();
  },
  getDayOfWeek: function() {
    return (new Date()).getDay();
  }
};
