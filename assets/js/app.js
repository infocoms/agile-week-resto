function fetcher() {
    let cityName = document.getElementById("input").value;
    fetch("https://developers.zomato.com/api/v2.1/cities?q=" + cityName, {
        headers: {
            "User-Key": "56c93a06a8b5ce046c8aa947fe8e78a1"
        }
    }).then(function (response) {
        return response.json();
    }).then(function (city) {
        console.log(city);
        let cityID = city.location_suggestions[0].id;

        fetch("https://developers.zomato.com/api/v2.1/search?entity_type=city&count=1000&entity_id=" + cityID, {
            headers: {
                "User-Key": "56c93a06a8b5ce046c8aa947fe8e78a1"
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
        })
    })
}

document.getElementById("run").addEventListener("click", function () {
    fetcher();
});
