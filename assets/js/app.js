function fetcher() {
    let cityName = document.getElementById("input").value;
    let selected = document.getElementById("select").value;
    fetch("https://developers.zomato.com/api/v2.1/cities?q=" + cityName, {
        headers: {
            "User-Key": "56c93a06a8b5ce046c8aa947fe8e78a1"
        }
    }).then(function (response) {
        return response.json();
    }).then(function (city) {
        console.log(city);
        let cityID = city.location_suggestions[0].id;

        fetch("https://developers.zomato.com/api/v2.1/search?entity_type=city&sort=rating&establishment_type=" + selected + "&entity_id=" + cityID, {
            headers: {
                "User-Key": "56c93a06a8b5ce046c8aa947fe8e78a1"
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);

            let target = document.getElementById("target");
            target.innerHTML = "";

            for (i = 0; i < 5; i++){
                let temp = document.getElementById("temp");
                let name = temp.content.querySelector(".name");
                let rating = temp.content.querySelector(".rating");
                let location = temp.content.querySelector(".location");
                let phone = temp.content.querySelector(".phone");
                let timings = temp.content.querySelector(".timings");

                name.innerText = data.restaurants[i].restaurant.name;
                rating.innerText = data.restaurants[i].restaurant.user_rating.aggregate_rating;

                let clone = temp.content.cloneNode(true);
                target.appendChild(clone);
            }




        })
    })
}

document.getElementById("run").addEventListener("click", function () {
    fetcher();
});
