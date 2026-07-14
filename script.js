// Create map
const map = L.map('map').setView([15.0, 120.8], 10);

// Base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Selected color
let selectedColor = "#ff0000";

// Color picker
const colorPicker = document.getElementById("colorPicker");

if (colorPicker) {
    colorPicker.addEventListener("input", function () {
        selectedColor = this.value;
    });
}

// Store GeoJSON layer
let bulacanLayer;

// Load Bulacan GeoJSON
fetch("maps/bulacan.geojson")
.then(response => response.json())
.then(data => {

    bulacanLayer = L.geoJSON(data, {

        style: function () {
            return {
                color: "#ffffff",
                weight: 1,
                fillColor: "#808080",
                fillOpacity: 0.8
            };
        },

        onEachFeature: function(feature, layer){

            // Hover effect
            layer.on("mouseover", function(){
                layer.setStyle({
                    weight: 3,
                    color: "#000000"
                });
            });

            layer.on("mouseout", function(){
                layer.setStyle({
                    weight: 1,
                    color: "#ffffff"
                });
            });


            // Click municipality
            layer.on("click", function(){

                layer.setStyle({
                    fillColor: selectedColor,
                    fillOpacity: 0.9
                });


                let name = "Municipality";

                if(feature.properties){
                    name = feature.properties.NAME_2 || 
                           feature.properties.name || 
                           "Municipality";
                }


                // Display selected area
                const display = document.getElementById("selectedArea");

                if(display){
                    display.innerHTML = 
                    "Selected: <b>" + name + "</b>";
                } else {
                    alert(name);
                }

            });

        }

    }).addTo(map);


    map.fitBounds(bulacanLayer.getBounds());

})
.catch(error => {
    console.error("Error loading GeoJSON:", error);
});


// Reset all colors button (optional)
const resetBtn = document.getElementById("resetMap");

if(resetBtn){
    resetBtn.addEventListener("click", function(){

        bulacanLayer.eachLayer(function(layer){

            layer.setStyle({
                fillColor:"#808080",
                fillOpacity:0.8
            });

        });

    });
}
