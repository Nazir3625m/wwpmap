var map = L.map('map').setView([12.8797,121.7740],6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'© OpenStreetMap'
}).addTo(map);

fetch('data/philippines.geojson')
.then(res=>res.json())
.then(data=>{

L.geoJSON(data,{
style:{
color:"#ffffff",
weight:1,
fillColor:"#808080",
fillOpacity:0.7
},
onEachFeature:function(feature,layer){

layer.on('click',function(){

layer.setStyle({
fillColor:"#ff0000"
});

console.log(feature.properties);

});

}
}).addTo(map);

});
