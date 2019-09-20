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

        document.getElementById("targetText").innerText = "Showing results for " + city.location_suggestions[0].name;


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

            for (i = 0; i < data.restaurants.length; i++) {
                let temp = document.getElementById("temp");
                let name = temp.content.querySelector(".name");
                let rating = temp.content.querySelector(".rating");
                let location = temp.content.querySelector(".location");
                let phone = temp.content.querySelector(".phone");
                let timings = temp.content.querySelector(".timings");
                let coin1 = temp.content.querySelector(".coin1");
                let coin2 = temp.content.querySelector(".coin2");
                let coin3 = temp.content.querySelector(".coin3");
                let coin4 = temp.content.querySelector(".coin4");
                let delivering = temp.content.querySelector(".delivers");
                let photos = temp.content.querySelector(".photos");
                let tagsPar = temp.content.querySelector(".tagsPar");

                let tagsText = "";

                let highlights = Array.from(data.restaurants[i].restaurant.highlights);
                if (highlights.includes("Halal")) {
                    tagsText += "Halal. "
                }

                if (highlights.includes("Vegan")) {
                    tagsText += "Vegan. "
                }

                if (highlights.includes("Kid Friendly")) {
                    tagsText += "Kid Friendly. "
                }

                if (!highlights.includes("Credit Card")) {
                    tagsText += "Cash Only. "
                }

                tagsPar.innerText = tagsText;

                name.innerText = data.restaurants[i].restaurant.name;

                if (data.restaurants[i].restaurant.photos) {
                    if (data.restaurants[i].restaurant.photos.length > 5){
                        for (let j = 0; j < 5; j++) {
                            photos.setAttribute("data-image" + j, data.restaurants[i].restaurant.photos[j].photo.url);
                        }
                    } else {
                        for (let j = 0; j < data.restaurants[i].restaurant.photos[j].length; j++) {
                            photos.setAttribute("data-image" + j, data.restaurants[i].restaurant.photos[j].photo.url);
                        }
                    }
                }

                rating.innerHTML = data.restaurants[i].restaurant.user_rating.aggregate_rating + "&#11088;";
                location.innerText = data.restaurants[i].restaurant.location.address;
                phone.innerHTML = "&#9743;" + data.restaurants[i].restaurant.phone_numbers;
                timings.innerText = data.restaurants[i].restaurant.timings;

                coin1.style.background = "url('src/coin.svg')";
                coin1.style.opacity = "1";
                coin1.style.backgroundRepeat = "no-repeat";
                coin2.style.background = "url('src/coin.svg')";
                coin2.style.opacity = "1";
                coin2.style.backgroundRepeat = "no-repeat";
                coin3.style.background = "url('src/coin.svg')";
                coin3.style.opacity = "1";
                coin3.style.backgroundRepeat = "no-repeat";
                coin4.style.background = "url('src/coin.svg')";
                coin4.style.opacity = "1";
                coin4.style.backgroundRepeat = "no-repeat";

                switch (data.restaurants[i].restaurant.price_range) {

                    case 1:
                        coin4.style.opacity = "0.3";
                        coin3.style.opacity = "0.3";
                        coin2.style.opacity = "0.3";
                        break;
                    case 2:
                        coin4.style.opacity = "0.3";
                        coin3.style.opacity = "0.3";
                        break;
                    case 3:
                        coin4.style.opacity = "0.3";
                }

                photos.src = photos.getAttribute("data-image" + "1");


                if (data.restaurants[i].restaurant.is_delivering_now === 0) {
                    delivering.innerText = "Not Delivering";
                    delivering.style.color = "red";
                } else {
                    delivering.innerText = "Delivering";
                    delivering.style.color = "Green";
                }

                let clone = temp.content.cloneNode(true);
                target.appendChild(clone);

                if (i === 4){
                    break;
                }
            }

            fetch("https://api.unsplash.com/search/photos/?client_id=e74ca46b22fd8cbf5fbb5c231739839cb4730ae959f74a65d24583789012d6c3&page=1&query=" + data.restaurants[0].restaurant.location.city)
                .then(function (response) {
                    return response.json()
                }).then(function (pictures) {
                console.log(pictures);
                let random = Math.floor(Math.random() * pictures.results.length);
                target.style.background = "url('" + pictures.results[random].urls.regular + "') no-repeat fixed";
                target.style.backgroundSize = "cover";
            });


        })
    })
}

document.getElementById("run").addEventListener("click", function () {
    fetcher();
});
