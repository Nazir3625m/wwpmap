// Create map
const map = L.map('map').setView([12.8797, 121.7740], 6);

// Base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Selected color
let selectedColor = "#ff0000";

// Temporary demo polygon
const demo = L.polygon([
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

demo.on("click",function(){
    demo.setStyle({
        fillColor:selectedColor
    });
});
