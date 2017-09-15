$(document).ready(function()
{









var subjects =
[
	"Futurama",
	"Napoleon Dynamite",
	"NBA",
	"Smashing Pumpkins",
	"My Little Pony"
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
		console.log(apireturn);
		var results = apireturn.data;
		console.log(results);
		console.log(results[0].images.fixed_height.url)

		for(i = 0; results.length > i; i++)
		{
			var giphyImage = $("<img>").attr("src", results[i].images.fixed_height.url);
			$("#giphyImages").prepend(giphyImage);
		}
		
	})





})













}) 

//Giphy API Key: dc6zaTOxFJmzC		83ae0d4a699248e4a511e87157b267f5