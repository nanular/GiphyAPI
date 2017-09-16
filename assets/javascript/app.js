$(document).ready(function()
{

var subjects =
[
	"Futurama",
	"Napoleon Dynamite",
	"NBA",
	"Smashing Pumpkins",
	"My Little Pony",
	"Jeopardy",
	"JavaScript",
	"Bad Dancing",
	"Breaking Bad",
	"Kawhi Leonard"
]


var toSearch = 
{
	baseURL: "http://api.giphy.com/v1/gifs/search?",
	apiKey: "&api_key=83ae0d4a699248e4a511e87157b267f5",
	q: "q=ben+stiller",
	limit: "&limit=10",
	rating: "&rating=g"
}

var buttonDiv = $(".allButtons");

function createButtons()
{
	buttonDiv.empty();
	for(i = 0; i < subjects.length; i++)
	{
		var giphyButton = $("<button>")
			.addClass("btn btn-primary pullGifs")
			.text(subjects[i])
			.attr("value", subjects[i].replace(/ /g, "+"))
			.appendTo(buttonDiv);
	}
}

createButtons();




$("#addQuery").click(function()
{
	event.preventDefault();

	var currentQuery = $("#qParameter").val().trim();
	subjects.push(currentQuery);
	createButtons();
})




$(document).on("click", ".pullGifs", function()
{

	toSearch.q = "q=" + $(this).attr("value");
	var queryURL = toSearch.baseURL + toSearch.q + toSearch.limit + toSearch.apiKey;


	console.log(queryURL);

	$.ajax(
	{
  		url: queryURL,
  		method: "GET",
	})

	.done(function(apireturn)
	{
		var results = apireturn.data;
		$("#giphyImages").empty();
		console.log(results);

		for(i = 0; results.length > i; i++)
		{
			var giphyResult = $("<div>").addClass("giphyImageAndRating")
			var giphyImage = $("<img>")
				.attr("src", results[i].images.fixed_height_still.url)
				.attr("playing", "false")
				.data("gifData", results[i].images)
				.addClass("playGif")
				.appendTo(giphyResult);
			giphyResult.prepend("Rating: <span>" + results[i].rating + "</span><br>");
			$("#giphyImages").prepend(giphyResult);
		}
		
	})

})



$(document).on("click", ".playGif", function()
{
	var playState = ($(this).attr("playing") == "true");
	
	if(playState)
	{
		$(this).attr("src", $(this).data("gifData").fixed_height_still.url);
        $(this).attr("playing", "false");
	}
	else
	{
		$(this).attr("src", $(this).data("gifData").fixed_height.url);
        $(this).attr("playing", "true");
	}

})











}) 

//Giphy API Key: dc6zaTOxFJmzC		83ae0d4a699248e4a511e87157b267f5