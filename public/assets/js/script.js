$(function () {

  $(".clear").on("click", (e) => {
    var id = $(e.target).data("id")
    var type = $(e.target).data("type")
    $(e.target).parent().remove()

    $.ajax(`/delete/${type}/${id}`, {
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