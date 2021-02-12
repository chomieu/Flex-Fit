$(function () {
  $(".badge").on("click", (e) => {
    $(e.target).hasClass("badge-secondary") ?
      $(e.target).removeClass("badge-secondary").addClass("badge-light") :
      $(e.target).removeClass("badge-light").addClass("badge-secondary")
  })

  $("#deleteAll").on("click", (e) => {
    fetch("/clearall", {
      method: "delete"
    }).then(() => {
      console.log("cleared all sessions")
    })
  })
})