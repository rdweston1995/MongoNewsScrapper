
$.getJSON("/articles", function (data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

$("button").on("click", function () {
    console.log("test");
    const routeText = $(this).text().split(" ").join().toLowerCase();
    console.log(routeText);
    $.get("/scrape/" + routeText);
});


