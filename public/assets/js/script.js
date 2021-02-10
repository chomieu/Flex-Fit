$(function () {
  var now = new Date
  const options = {weekday: 'short', month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true}
  $("#sessionName").attr("placeholder", now.toLocaleString("en-US", options))
})