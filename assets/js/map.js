const geoserverUrl="https://......./wms";
const wmsVar = [

{
    id: "LCC",
    title: "LCC",
    layerName: "WORKSPACE:LCC"
},

{
    id: "pm10",
    title: "pm10",
    layerName: "WORKSPACE:pm10"
},

{
    id: "pm25",
    title: "LCC",
    layerName: "WORKSPACE:pm25"
},
{
    id: "no2",
    title: "LCC",
    layerName: "WORKSPACE:no2"
}

];


const osmLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

const myWmsLayer = {};

//const myWmsLayer = new ol.layer.Tile({
//  source: new ol.source.TileWMS({
//    url: 'http://set_it:000/geoserver/YOUR_WORKSPACE/wms',
//    params: {
//      LAYERS: 'YOUR_WORKSPACE:YOUR_LAYER_NAME',
//      TILED: true
//    },
//    serverType: 'geoserver'
//  })
//});


const map = new ol.Map({
  target: 'map',
  layers: [
    osmLayer,
    //myWmsLayer
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([10.4, 51.2]), 
    zoom: 6
  })
});