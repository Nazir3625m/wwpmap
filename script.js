// CREATE MAP
const map = L.map('map').setView([15.0, 120.8], 10);


// BASE MAP
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


// SELECTED COLOR
let selectedColor = "#ff0000";


// COLOR PICKER
document.getElementById("colorPicker").addEventListener("input", function () {
    selectedColor = this.value;
});


// LOAD BULACAN GEOJSON
fetch("maps/municities-province-17-bulacan.0.1.json")

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


            let municipality =
            feature.properties.NAME_2 ||
            feature.properties.name ||
            "Municipality";


            // HOVER EFFECT
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



            // CLICK TO CHANGE COLOR
            layer.on("click", function(){


                layer.setStyle({

                    fillColor: selectedColor

                });



                layer.bindPopup(
                    "<b>" + municipality + "</b>"
                ).openPopup();


            });


        }


    }).addTo(map);



    // AUTO ZOOM TO BULACAN
    map.fitBounds(layer.getBounds());


})


.catch(error => {

    console.error("Error loading GeoJSON:", error);

});
