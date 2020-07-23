$(document).ready(() => {});

$(".searchBtn").click(function (event) {
  event.preventDefault();
  //   search
  var citySearch = $("#city-search").val();
  var APIKey = "5c73b3c517e1045d4b43170d53c1c2be";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
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

    $("#temperature").text(response.main.temp + "\xB0F");
    $("#humidity").text(response.main.humidity + "%");
    $("#wind-speed").text(response.wind.speed + " MPH");

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
      }
      if (uvIndex >= 2 && uvIndex <= 5) {
        $("#uv-index").attr("class", "moderate");
      }
      if (uvIndex > 5 && uvIndex <= 7) {
        $("#uv-index").attr("class", "high");
      }
      if (uvIndex > 7 && uvIndex <= 10) {
        $("#uv-index").attr("class", "very-high");
      }
      if (uvIndex > 10) {
        $("#uv-index").attr("class", "extreme");
      }
      console.log("UV Index:", uvIndex);
    });
  });

  //   FIVE DAY FORECAST
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

    var firstDay = moment(response.list[3].dt_txt).format("dddd MMMM Do YYYY");
    $("#one").text(firstDay);
    $("#temperature-one").text(parseInt(response.list[3].main.temp) + "\xB0F");
    $("#humidity-one").text(response.list[3].main.humidity + "%");
    var iconCode = response.list[3].weather[0].icon;
    var weatherIcon = "http://openweathermap.org/img/w/" + iconCode + ".png";
    $("#icon-image1").attr("src", weatherIcon);

    var secondDay = moment(response.list[11].dt_txt).format(
      "dddd MMMM Do YYYY"
    );
    $("#two").text(secondDay);
    $("#temperature-two").text(parseInt(response.list[11].main.temp) + "\xB0F");
    $("#humidity-two").text(response.list[11].main.humidity + "%");
    var iconCode = response.list[11].weather[0].icon;
    var weatherIcon = "http://openweathermap.org/img/w/" + iconCode + ".png";
    $("#icon-image2").attr("src", weatherIcon);

    var thirdDay = moment(response.list[19].dt_txt).format("dddd MMMM Do YYYY");
    $("#three").text(thirdDay);
    $("#temperature-three").text(
      parseInt(response.list[19].main.temp) + "\xB0F"
    );
    $("#humidity-three").text(response.list[19].main.humidity + "%");
    var iconCode = response.list[19].weather[0].icon;
    var weatherIcon = "http://openweathermap.org/img/w/" + iconCode + ".png";
    $("#icon-image3").attr("src", weatherIcon);

    var fourthDay = moment(response.list[27].dt_txt).format(
      "dddd MMMM Do YYYY"
    );
    $("#four").text(fourthDay);
    $("#temperature-four").text(
      parseInt(response.list[27].main.temp) + "\xB0F"
    );
    $("#humidity-four").text(response.list[27].main.humidity + "%");
    var iconCode = response.list[27].weather[0].icon;
    var weatherIcon = "http://openweathermap.org/img/w/" + iconCode + ".png";
    $("#icon-image4").attr("src", weatherIcon);

    var fifthDay = moment(response.list[35].dt_txt).format("dddd MMMM Do YYYY");
    $("#five").text(fifthDay);
    $("#temperature-five").text(
      parseInt(response.list[35].main.temp) + "\xB0F"
    );
    $("#humidity-five").text(response.list[35].main.humidity + "%");
    var iconCode = response.list[35].weather[0].icon;
    var weatherIcon = "http://openweathermap.org/img/w/" + iconCode + ".png";
    $("#icon-image5").attr("src", weatherIcon);
  });
});
