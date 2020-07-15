$(document).ready(() => {});

$(".searchBtn").click(function (event) {
  event.preventDefault();
  //   search
  var citySearch = $("#city-search").val();
  var APIKey = "5c73b3c517e1045d4b43170d53c1c2be";
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    citySearch +
    "&appid=" +
    APIKey +
    "&units=imperial";
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    var cityName = response.cityname;
    $("#city-name").text(cityName);

    var date = moment();
    var dateDisplay = date.format("dddd MMMM Do YYYY");
    $("#date").text(dateDisplay);

    // Icon
    var iconCode = response.weather[0].icon;
    var weatherIcon = "http://openweathermap.org/img/w/" + iconCode + ".png";
    console.log(iconCode);
    $("#icon-image").attr("src", weatherIcon);

    $("#temperature").text(response.main.temp);
    $("#humidity").text(response.main.humidity);
    $("#wind-speed").text(response.wind.speed);

    //UV Index
    var latitude = response.coord.lat;
    var longitude = response.coord.lon;
    var uvURL =
      "http://api.openweathermap.org/data/2.5/uvi?appid=" +
      APIKey +
      "&lat=" +
      latitude +
      "&lon=" +
      longitude;
    console.log("uvURL:", uvURL);
    $.ajax({
      url: uvURL,
      method: "GET",
    }).then(function (result) {
      console.log("UV", result);
      var uvIndex = result.value;
      $("#uv-index").text(uvIndex);
      if (uvIndex < 2) {
        $("#uv-index").attr("class", "low");
        console.log("You're safe!");
      }
      if (uvIndex >= 2 && uvIndex <= 5) {
        $("#uv-index").attr("class", "moderate");
        console.log("Getting risky");
      }
      if (uvIndex > 5 && uvIndex <= 7) {
        $("#uv-index").attr("class", "high");
        console.log("Uh oh!");
      }
      if (uvIndex > 7 && uvIndex <= 10) {
        $("#uv-index").attr("class", "very-high");
        console.log("You better stay inside!");
      }
      if (uvIndex > 10) {
        $("#uv-index").attr("class", "extreme");
        console.log("You will ignite on fire");
      }
      console.log("UV Index:", uvIndex);
    });
  });
});
