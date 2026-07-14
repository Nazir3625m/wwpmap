// Create map
const map = L.map('map').setView([15.0, 120.8], 10);

// Base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Selected color
let selectedColor = "#ff0000";

// Color picker
document.getElementById("colorPicker").addEventListener("input", function () {
    selectedColor = this.value;
});

// Load Bulacan GeoJSON
fetch("maps/bulacan.geojson")
.then(response => response.json())
.then(data => {

    const layer = L.geoJSON(data, {
        style: {
            color: "#ffffff",
            weight: 1,
            fillColor: "#808080",
            fillOpacity: 0.8
        },

        onEachFeature: function(feature, layer){

            layer.on("click", function(){

                layer.setStyle({
                    fillColor: selectedColor
                });

                if(feature.properties){
                    alert(feature.properties.NAME_2 || feature.properties.name || "Municipality");
                }

            });

        }

    }).addTo(map);

    map.fitBounds(layer.getBounds());

})
.catch(error => {
    console.error("Error loading GeoJSON:", error);
});
