
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

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=ce8c11c996c61edc1c5e6e600162d8a9')

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



                })

            // loop for five days
        })


}