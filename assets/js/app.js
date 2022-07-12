
var citySearch;
var submitBtn = document.querySelector('#searchBtn');
var searchTxt = document.querySelector('#searchTxt');
var todayDate = $('#today-date').text(moment().format('MMMM Do, YYYY'))




submitBtn.onclick = function () {
    // event.preventDefault();

    // get value from input box 
    citySearch = searchTxt.value;

    // input value in api links to get correct info from openweather

    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + citySearch + '&limit=5&appid=ce8c11c996c61edc1c5e6e600162d8a9')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            console.log(lat, lon);
            $('#city-name').text(citySearch)

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=ce8c11c996c61edc1c5e6e600162d8a9')

                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    console.log(data);

                var i = 0;

                    $('.forecast-main').each(function () {
                        
                        var weatherDataMain = data.daily[i].weather[0].description;

                        console.log(weatherDataMain);
                        $(this).text(weatherDataMain);
                                            
               
                        i++;
            
                    })

                    i = 0;
                    
                    $('.wicon').each(function() {
                    
                        var iconCode = data.daily[i].weather[0].icon;
                        var  iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';

                        $(this).attr('src', iconUrl);

                        i++;
                    })

                    i = 0;

                    $('.temp').each(function() {
                        var tempData = Math.floor(data.daily[i].temp.day);

                        // convert Kelvin to farenheight
                        $(this).text(`${tempData} °F`)
                        i++;
                    })

                    i = 0;
                    $('.humidity').each(function() {
                        var humidityData = data.daily[i].humidity;
                        $(this).text(`${humidityData}% humidity`);
                        i++;
                    })

                    i = 0;
                    $('.wind').each(function() {
                        var wind = Math.floor(data.daily[i].wind_speed);

                        $(this).text(`${wind}mph winds`)
                        i++;
                    })

                    i = 0;
                    $('.uv').each(function() {
                        var uvi = data.daily[i].uvi;

                        $(this).text(`UVI: ${uvi}`);

                        if(uvi < 3){
                            $(this).css('background-color', 'lightblue');
                        } else if(uvi >= 3 && uvi < 6) {
                            $(this).css('background-color', 'green');
                        } else if(uvi >=6 && uvi < 10) {
                            $(this).css('background-color', 'orange');
                        } else if(uvi >=10) {
                            $(this).css('background-color', 'red');
                        }
                        i++;
                    })



                })
        })


}