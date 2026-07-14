// ========================
// CREATE MAP
// ========================
const map = L.map('map').setView([15.0, 120.8], 10);

// ========================
// BASE MAP
// ========================
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// ========================
// SELECTED COLOR
// ========================
let selectedColor = "#ff0000";

document.getElementById("colorPicker").addEventListener("input", function () {
    selectedColor = this.value;
});

let geojsonLayer;

// ========================
// LOAD BULACAN GEOJSON
// ========================
fetch("./maps/municities-province-17-bulacan.0.1.json")
.then(response => {

    if (!response.ok) {
        throw new Error("Cannot load GeoJSON.");
    }

    return response.json();

})
.then(data => {

    geojsonLayer = L.geoJSON(data, {

        style: function () {
            return {
                color: "#ffffff",
                weight: 1,
                fillColor: "#808080",
                fillOpacity: 0.8
            };
        },

        onEachFeature: function (feature, layer) {

            const municipality =
                feature.properties.ADM3_EN ||
                feature.properties.NAME_2 ||
                feature.properties.NAME ||
                feature.properties.name ||
                "Municipality";

            // Hover
            layer.on("mouseover", function () {
                layer.setStyle({
                    weight: 3,
                    color: "#000000"
                });
            });

            layer.on("mouseout", function () {
                geojsonLayer.resetStyle(layer);
            });

            // Click
            layer.on("click", function () {

                layer.setStyle({
                    fillColor: selectedColor,
                    fillOpacity: 0.9
                });

                layer.bindPopup("<b>" + municipality + "</b>").openPopup();

            });

        }

    }).addTo(map);

    map.fitBounds(geojsonLayer.getBounds());

})
.catch(error => {

    console.error(error);
    alert("Failed to load GeoJSON file.");

});

// ========================
// DOWNLOAD PNG
// ========================
document.getElementById("downloadBtn").addEventListener("click", function () {
    window.print();
});
