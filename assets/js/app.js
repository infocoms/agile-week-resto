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
                rating.innerHTML = data.restaurants[i].restaurant.user_rating.aggregate_rating + "&#11088;";
                location.innerText = data.restaurants[i].restaurant.location.address;
                phone.innerText = data.restaurants[i].restaurant.phone_numbers;
                timings.innerText = data.restaurants[i].restaurant.timings;

                let clone = temp.content.cloneNode(true);
                target.appendChild(clone);
            }

            fetch("https://api.unsplash.com/search/photos/?client_id=e74ca46b22fd8cbf5fbb5c231739839cb4730ae959f74a65d24583789012d6c3&page=1&query=" + data.restaurants[2].restaurant.location.city)
                .then(function (response) {
                    return response.json()
                }).then(function (pictures) {
                console.log(pictures);

                let random = Math.floor(Math.random() * pictures.results.length);
                console.log(random);

                target.style.background = "url('" + pictures.results[random].urls.regular + "') no-repeat center center fixed";
                //target.style.backgroundSize = "cover";
                target.style.border = "1px solid white";
            })

        })
    })
}

document.getElementById("run").addEventListener("click", function () {
    fetcher();
});
