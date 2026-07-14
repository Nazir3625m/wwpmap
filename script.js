// Create map
const map = L.map("map").setView([12.8797,121.7740],6);

// OpenStreetMap layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"© OpenStreetMap contributors",
    maxZoom:19
}).addTo(map);

// Default color
let selectedColor="#ff0000";

// Demo polygon
const demo=L.polygon([
    [14.85,120.82],
    [14.92,120.98],
    [14.73,121.03],
    [14.65,120.87]
],{
    color:"#ffffff",
    weight:2,
    fillColor:"#808080",
    fillOpacity:0.7
}).addTo(map);

// Click polygon
demo.on("click",function(){

    demo.setStyle({
        fillColor:selectedColor
    });

});

// Color Picker
document.getElementById("colorPicker").addEventListener("input",function(){

    selectedColor=this.value;

});

// Apply Button
document.getElementById("applyBtn").onclick=function(){

    alert("Select a municipality on the next version.");

};

// Export Button
document.getElementById("downloadBtn").onclick=function(){

    alert("PNG Export will be available in Version 2.");

};
