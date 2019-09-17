var positionArray = [];
function getCoords () {
    navigator.geolocation.getCurrentPosition(function(position){
        positionArray.push(position.coords.latitude);
        positionArray.push(position.coords.longitude);

    });
}

getCoords();


function showCity (){
    axios("https://api.opencagedata.com/geocode/v1/json?key=6301d53481104202bdda74b2d76ae44f&q="+positionArray[0]+"%2C+"+positionArray[1]+"&pretty=1&no_annotations=1")
        .then(function(response){
            document.getElementById('cityName').innerText = response.data.results[0].components.city
        })
        .catch(function(error){
            alert("error")
        })
}

document.getElementById("run").addEventListener("click", function(){
    document.getElementById("coords").innerText = "Your position is: "+positionArray[0]+", "+positionArray[1];

    showCity();
    axios("https://developers.zomato.com/api/v2.1/search?lat="+positionArray[0]+"&lon="+positionArray[1]+"&radius=10000", {
            headers: {
                "User-Key": "9729313939c69dfb4b25595b2cab0e89"
            }
            }).then(function(response){
                console.log(response.data);
            }).catch(function(error){
                console.error(error);
            }).finally(function(){});

});