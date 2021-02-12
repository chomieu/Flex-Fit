$(function () {

  $(".clear").on("click", (e) => {
    var id = $(e.target).data("id")
    $(e.target).parent().remove()

    $.ajax("/delete/" + id, {
      type: "DELETE",
    })
  })

  // $("#deleteAll").on("click", (e) => {
  //   fetch("/clearall", {
  //     method: "delete"
  //   }).then(() => {
  //     console.log("cleared all sessions")
  //   })
  // })
})