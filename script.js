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

    var cityName = response.name;
    $(".city-name").text(cityName);

    var date = moment();
    var dateDisplay = date.format("dddd MMMM Do YYYY");
    $(".date").text(dateDisplay);

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

  //   FIVE DAY FORECAST
  // five Day Forecast
  var forecastURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    citySearch +
    "&appid=c7629276d88b73d9dee17485c554906b" +
    "&units=imperial";
  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // day one
    var firstDay = moment(response.list[0].dt_txt).format("dddd MMMM Do YYYY");
    $("#one").text(firstDay);
    $("#temperature-one").text(response.list[0].main.temp);
    $("#humidity-one").text(response.list[0].main.humidity);
    $("#pressure-one").text(response.list[0].main.pressure);
    var secondDay = moment(response.list[8].dt_txt).format("dddd MMMM Do YYYY");
    $("#two").text(secondDay);
    $("#temperature-two").text(response.list[8].main.temp);
    $("#humidity-two").text(response.list[8].main.humidity);
    $("#pressure-two").text(response.list[8].main.pressure);
    var thirdDay = moment(response.list[16].dt_txt).format("dddd MMMM Do YYYY");
    $("#three").text(thirdDay);
    $("#temperature-three").text(response.list[16].main.temp);
    $("#humidity-three").text(response.list[16].main.humidity);
    $("#pressure-three").text(response.list[16].main.pressure);
    var fourthDay = moment(response.list[24].dt_txt).format(
      "dddd MMMM Do YYYY"
    );
    $("#four").text(fourthDay);
    $("#temperature-four").text(response.list[24].main.temp);
    $("#humidity-four").text(response.list[24].main.humidity);
    $("#pressure-four").text(response.list[24].main.pressure);
    var fifthDay = moment(response.list[32].dt_txt).format("dddd MMMM Do YYYY");
    $("#five").text(fifthDay);
    $("#temperature-five").text(response.list[32].main.temp);
    $("#humidity-five").text(response.list[32].main.humidity);
    $("#pressure-five").text(response.list[32].main.pressure);
  });
});
