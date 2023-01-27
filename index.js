window.onload = onLoad;

function log(e) {
    console.log(e);
}

async function onLoad() {
    var url = 'https://api.themoviedb.org/3/trending/movie/week?' +
        'api_key=3c810030a204cb5f445d2b52b0425a8c'; //URL

    const result = await fetch(url).then((response) => {
        return response.json();
    }); //取得
    var innerHTML_list = [];

    for (let i = 0; i <= 10; i++) {
        var movie_poster_path = result.results[i].poster_path;
        var poster_path = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie_poster_path; //ポスター画像
        var title = result.results[i].title; //タイトル
        var vote_average = result.results[i].vote_average; //評価

        var html = document.getElementById('scroll_content');
        var innerHTML =
            '<li>'
            + '<a href="#"><img src="' + poster_path + '"></a>'
            + '<h3>' + title + '</h3>'
            + '<p>評価 10 / ' + vote_average + '</p>'
            + '</li>';
        innerHTML_list.push(innerHTML);
    }
    innerHTML_list = innerHTML_list.join('');
    html.innerHTML = innerHTML_list;
}

async function get() {
    const query = document.getElementById("searchbox").value
    log(query)
    if (query == "") {
    } else {
        var url = 'https://api.themoviedb.org/3/search/movie?'
            + 'api_key=3c810030a204cb5f445d2b52b0425a8c'
            + '&language=jsS&query=' + query
            + '&page=1&include_adult=false'; //URL

        const result = await fetch(url).then((response) => {
            return response.json();
        }); //取得
        log(result)
        var innerHTML_list = [];
        length = result.results.length
        if (10 < length) {
            for (let i = 0; i <= 10; i++) {
                var movie_poster_path = result.results[i].poster_path;
                var poster_path = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie_poster_path; //ポスター画像
                var title = result.results[i].original_title; //タイトル
                var vote_average = result.results[i].vote_average; //評価

                var html = document.getElementById('scroll_content');
                var innerHTML =
                    '<li>'
                    + '<a href="#"><img src="' + poster_path + '"></a>'
                    + '<h3>' + title + '</h3>'
                    + '<p>評価 10 / ' + vote_average + '</p>'
                    + '</li>';
                innerHTML_list.push(innerHTML);
            }
        } else {
            for (let i = 0; i < length; i++) {
                var movie_poster_path = result.results[i].poster_path;
                var poster_path = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie_poster_path; //ポスター画像
                var title = result.results[i].original_title; //タイトル
                var vote_average = result.results[i].vote_average; //評価

                var html = document.getElementById('scroll_content');
                var innerHTML =
                    '<li>'
                    + '<a href="#"><img src="' + poster_path + '"></a>'
                    + '<h3>' + title + '</h3>'
                    + '<p>評価 10 / ' + vote_average + '</p>'
                    + '</li>';
                innerHTML_list.push(innerHTML);
            }
        }
        innerHTML_list = innerHTML_list.join('');
        html.innerHTML = innerHTML_list;
        var html = document.getElementById('title');
        html.innerHTML = '<h1>検索結果 : ' + query + '</h1>';
    }
}

const promise = new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(function (position) {
        resolve(position.coords);
    });
}).then((position) => {
    latitude = position.latitude;
    longitude = position.longitude;
    var map;
    var service;
    var infowindow;
    initMap(latitude, longitude);
});

function initMap(latitude, longitude) {
    var pyrmont = new google.maps.LatLng(latitude, longitude);

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 13
    });

    var request = {
        location: pyrmont,
        radius: '50000',
        type: ['movie_theater']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}


function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", () => {
        var contentString = place.name
        infowindow = new google.maps.InfoWindow({
            content: contentString,
            ariaLabel: "Uluru",
        });
        infowindow.open({
            anchor: marker,
            map,
        });
    });
}