$(function () {
  $(".clear").on("click", (e) => {
    var id = $(e.target).data("id")
    var type = $(e.target).data("type")
    $(e.target).parent().remove()

    fetch(`/delete/${type}/${id}`, {
      method: "delete",
    })
  })
})