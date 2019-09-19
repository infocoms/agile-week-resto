var positionArray = [];

function getCoords () {
    navigator.geolocation.getCurrentPosition(function (position) {
        positionArray.push(position.coords.latitude);
        positionArray.push(position.coords.longitude);
        axios.get("https://api.opencagedata.com/geocode/v1/json?key=6301d53481104202bdda74b2d76ae44f&q="+positionArray[0]+"%2C+"+positionArray[1]+"&pretty=1&no_annotations=1")
            .then(function(response){
                let city = response.data.results[0].components.city;
                console.log(city);

                var result = confirm("Add current location to box? "+ city);
                if (result == true) {
                    document.getElementById("input").value = city;
                } else {
                    alert("Cancel was pressed.");
                }
            })
            .catch(function(error){
                alert("error")
            })
    });
}

document.getElementById("geo").addEventListener("click", function(){
    getCoords();
});




