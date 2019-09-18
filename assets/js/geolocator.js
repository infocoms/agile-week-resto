var positionArray = [];
function getCoords () {
    navigator.geolocation.getCurrentPosition(function(position){
        positionArray.push(position.coords.latitude);
        positionArray.push(position.coords.longitude);

    });
}
console.log(positionArray);
getCoords();

//positionArray = [51.509865, -0.118092];
function showCity (){
    axios.get("https://api.opencagedata.com/geocode/v1/json?key=6301d53481104202bdda74b2d76ae44f&q="+positionArray[0]+"%2C+"+positionArray[1]+"&pretty=1&no_annotations=1")
        .then(function(response){
            document.getElementById('cityName').innerText = response.data.results[0].components.city;
        })
        .catch(function(error){
            alert("error")
        })
}

  /* function getListLocalRestaurants () {
    let localResults = [];
    let restaurantIDs = [];
    axios.get("https://developers.zomato.com/api/v2.1/search?lat=" + positionArray[0] + "&lon=" + positionArray[1] + "&radius=10000", {
        headers: {
            "User-Key": "9729313939c69dfb4b25595b2cab0e89"
        }
    }).then(function (response) {
        localResults = response.data;
        console.log(localResults);
       localResults.restaurants.forEach(function (element) {
           restaurantIDs.push(element.restaurant.id);
          // showLocalRestaurants(resturantIDs);

             })
         })
            .catch(function (error) {
            console.error(error);

        })
        .finally(function () {
        });


}


function showLocalRestaurants (_RestaurantsIDs) {
    let dataRest = [];
    for (let i = 0; i < 5; i++) {
        axios.get("https://developers.zomato.com/api/v2.1/restaurant?res_id=" + _RestaurantsIDs[i], {
            headers: {
                "User-Key": "9729313939c69dfb4b25595b2cab0e89"
            }
        })
            .then(function (response) {
                dataRest = response.data;
                console.log(dataRest.name);
                console.log(dataRest.photos);
                console.log(dataRest.all_reviews);
                console.log(dataRest.location.address);
                console.log(dataRest.phone_numbers);
                console.log(dataRest.user_rating.aggregrate);
                console.log(dataRest.timings);
            });
    }
} */

document.getElementById("run").addEventListener("click", function() {
   document.getElementById("coords").innerText = "Your position is: " + positionArray[0] + ", " + positionArray[1];
   showCity();
 // getListLocalRestaurants();

});

