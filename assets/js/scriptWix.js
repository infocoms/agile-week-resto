var userInput = document.getElementById("input").value;

var coords = document.getElementById("coords");

var positionArray = [];
navigator.geolocation.getCurrentPosition(function (position) {
    positionArray.push(position.coords.latitude);
    positionArray.push(position.coords.longitude);
});

console.log(positionArray);
//console.log(positionArray.Longitude);
document.getElementById("run").addEventListener("click", function () {
    let locations = [];
    axios.get("https://search.wixrestaurants.com/v1/restaurants/near?lat=" + positionArray[0] + "&lng=" + positionArray[1] + "&radius=10000")
        .then(function (response) {
            locations = response.data.restaurantIds;
            let foodPlaces = [];
            console.log(locations);
            locations.forEach(function (element) {
                axios.get("https://api.wixrestaurants.com/v2/organizations/" + element)
                    .then(function (response) {
                        foodPlaces = response.data;
                        console.log(foodPlaces);
                    })
                    .catch(function (error) {
                        console.error(error);
                    })
                    .finally(function () {

                    });
            })
        })
        .catch(function (error) {
            console.error(error);
        })
        .finally(function () {

        });

});