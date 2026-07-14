// ===========================================
// Weather Watch PH Mapping System v2
// Part 1 - Map Initialization
// ===========================================

// ---------- MAP ----------
const map = L.map("map").setView([15.0, 120.8], 10);

// ---------- BASEMAP ----------
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 19
}).addTo(map);

// ---------- VARIABLES ----------
let geojsonLayer = null;
let selectedColor = "#ff0000";

const regionSelect = document.getElementById("region");
const provinceSelect = document.getElementById("province");
const municipalitySelect = document.getElementById("municipality");

const colorPicker = document.getElementById("colorPicker");
const selectedLabel = document.getElementById("selectedMunicipality");

colorPicker.addEventListener("input", () => {
    selectedColor = colorPicker.value;
});

// ---------- DROPDOWN ----------
municipalitySelect.innerHTML =
'<option value="">Select Municipality</option>';

// ---------- LOAD GEOJSON ----------
fetch("./maps/municities-province-17-bulacan.0.1.json")

.then(res => {

    if(!res.ok){

        throw new Error("Cannot load GeoJSON");

    }

    return res.json();

})

.then(data => {

    geojsonLayer = L.geoJSON(data,{

        style: defaultStyle,

        onEachFeature: onEachMunicipality

    }).addTo(map);

    map.fitBounds(geojsonLayer.getBounds());

    loadMunicipalityDropdown();

})

.catch(err=>{

    console.error(err);

    alert("GeoJSON failed to load.");

});

// ===========================================
// DEFAULT STYLE
// ===========================================

function defaultStyle(){

    return{

        color:"#ffffff",

        weight:1,

        fillColor:"#808080",

        fillOpacity:0.8

    };

}
// ===========================================
// PART 2 - MUNICIPALITY FUNCTIONS
// ===========================================

// Load Municipality Dropdown
function loadMunicipalityDropdown(){

    municipalitySelect.innerHTML =
    '<option value="">Select Municipality</option>';

    geojsonLayer.eachLayer(function(layer){

        const props = layer.feature.properties;

        const municipality =
            props.ADM3_EN ||
            props.NAME_2 ||
            props.NAME ||
            props.name ||
            "Unknown";

        const option = document.createElement("option");

        option.value = municipality;
        option.textContent = municipality;

        municipalitySelect.appendChild(option);

    });

}


// Municipality Events
function onEachMunicipality(feature, layer){

    const props = feature.properties;

    const municipality =
        props.ADM3_EN ||
        props.NAME_2 ||
        props.NAME ||
        props.name ||
        "Unknown";


    // Hover
    layer.on("mouseover",function(){

        layer.setStyle({

            weight:3,
            color:"#000000"

        });

    });


    layer.on("mouseout",function(){

        geojsonLayer.resetStyle(layer);

    });


    // Click
    layer.on("click",function(){

        highlightMunicipality(layer, municipality);

    });

}


// Highlight Function
function highlightMunicipality(layer, municipality){

    geojsonLayer.resetStyle();

    layer.setStyle({

        fillColor:selectedColor,
        fillOpacity:0.9,
        color:"#000000",
        weight:3

    });

    map.fitBounds(layer.getBounds());

    layer.bindPopup("<b>"+municipality+"</b>").openPopup();

    selectedLabel.textContent = municipality;

    municipalitySelect.value = municipality;

}


// Dropdown Change
municipalitySelect.addEventListener("change",function(){

    const selected = this.value;

    geojsonLayer.eachLayer(function(layer){

        const props = layer.feature.properties;

        const municipality =
            props.ADM3_EN ||
            props.NAME_2 ||
            props.NAME ||
            props.name ||
            "Unknown";

        if(municipality === selected){

            highlightMunicipality(layer, municipality);

        }

    });

});
// ===========================================
// PART 3 - BUTTONS & UTILITIES
// ===========================================

// APPLY BUTTON
document.getElementById("applyBtn").addEventListener("click", function () {

    const selected = municipalitySelect.value;

    if (!selected) {
        alert("Please select a municipality.");
        return;
    }

    geojsonLayer.eachLayer(function(layer){

        const props = layer.feature.properties;

        const municipality =
            props.ADM3_EN ||
            props.NAME_2 ||
            props.NAME ||
            props.name ||
            "Unknown";

        if(municipality === selected){

            highlightMunicipality(layer, municipality);

        }

    });

});

// RESET BUTTON
document.getElementById("resetBtn").addEventListener("click", function(){

    geojsonLayer.eachLayer(function(layer){

        geojsonLayer.resetStyle(layer);

    });

    municipalitySelect.selectedIndex = 0;

    selectedLabel.textContent = "None";

});

// DOWNLOAD PNG (Temporary)
document.getElementById("downloadBtn").addEventListener("click", function(){

    window.print();

});

// ===========================================
// REGION / PROVINCE PLACEHOLDER
// ===========================================

// Current Version:
// Region III
// Province: Bulacan

regionSelect.innerHTML = `
<option value="r3">Region III - Central Luzon</option>
`;

provinceSelect.innerHTML = `
<option value="bulacan">Bulacan</option>
`;

regionSelect.disabled = true;
provinceSelect.disabled = true;

// ===========================================
// FINISHED
// ===========================================

console.log("Weather Watch PH Mapping System v2 Loaded Successfully");
