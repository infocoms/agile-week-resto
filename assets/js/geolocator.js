var positionArray = [];
function getCoords () {
    navigator.geolocation.getCurrentPosition(function(position){
        positionArray.push(position.coords.latitude);
        positionArray.push(position.coords.longitude);

    });
}

getCoords();

//positionArray = [51.509865, -0.118092];
function showCity (){
    axios.get("https://api.opencagedata.com/geocode/v1/json?key=6301d53481104202bdda74b2d76ae44f&q="+positionArray[0]+"%2C+"+positionArray[1]+"&pretty=1&no_annotations=1")
        .then(function(response){
            console.log(response);
            document.getElementById("input").value = response.data.results[0].components.city;
        })
        .catch(function(error){
            alert("error")
        })
}

//showCity();




