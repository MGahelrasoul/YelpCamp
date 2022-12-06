mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v10",
    center: campground.geometry.coordinates,
    zoom: 10
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<div class="card">
                <h5 class="card-header">${campground.title}</h5>
                <div class="card-body">
                    <p class="card-text text-muted mb-2" style="line-height: .75;">${campground.location}</p>
                </div>
            </div>`
        )
    )
    .addTo(map)