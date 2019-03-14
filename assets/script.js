$(document).ready(function() {

var superHeroes = ["the flash", "batman", "spiderman", "captain planet"];
// creates buttons
function updateButtons() {
    for (i = 0; i < superHeroes.length; i++) {
        var newButton = $("<button>");
        newButton.attr("class", "btn-primary")
        newButton.attr("value", superHeroes[i]);
        newButton.text(superHeroes[i]);
        $("#button-holder").append(newButton);

    };
};
// when you press search...

$("#search").on("click", function(event){
    event.preventDefault();
    var searched = $("#search-for").val().trim();
    console.log(searched);
    superHeroes.push(searched);
    $("#button-holder").empty();
    updateButtons();
    
});


// when you press a button...
 $(document).on("click", ".btn-primary" ,function() {
     $("#image-holder").empty()
    var query = $(this).val();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=4x0YVZTQJACyBPeIxzAOmb6Y6ap7q1EI";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);
        var results = response.data;
        for (i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var display = $("<p>").text("Rating: " + results[i].rating)
            var displayGif = $("<img>")
            var still = results[i].images.fixed_height_still.url;
            var active = results[i].images.fixed_height.url
            displayGif.attr("src", still)
            displayGif.attr("data-still", still)
            displayGif.attr("data-active", active)
            displayGif.attr("class", "image-buttons")
            displayGif.attr("data-state", "still")

            display.append(displayGif)
            gifDiv.append(display)
            $("#image-holder").append(gifDiv)
        }
    });

    $(document).on("click", ".image-buttons", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-active"));
            $(this).attr("data-state", "active")
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }
    })

});

updateButtons()
});
