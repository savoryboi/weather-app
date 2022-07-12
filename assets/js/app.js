
var citySearch;
var submitBtn = document.querySelector('#searchBtn');
var searchTxt = document.querySelector('#searchTxt');





submitBtn.onclick = function () {
    // event.preventDefault();
    
    // get value from input box 
    citySearch = searchTxt.value;

    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + citySearch + '&limit=5&appid=ce8c11c996c61edc1c5e6e600162d8a9')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            console.log(lat, lon);

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=ce8c11c996c61edc1c5e6e600162d8a9')
                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    console.log(data, 'this is second');
                    // get specific data within this function
                    // loop for five days
                })

        })
}



// submitBtn.addEventListener('click', beginSearch);