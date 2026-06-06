// 1. Base maps
const satelliteLayer = new ol.layer.Tile({
  title: "Satellite",
  type: "base",
  visible: false,
  source: new ol.source.XYZ({
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  }),
});

const osmLayer = new ol.layer.Tile({
  title: "OSM",
  type: "base",
  visible: true,
  source: new ol.source.OSM(),
});

const cartoLayer = new ol.layer.Tile({
  title: "Carto",
  type: "base",
  visible: false,
  source: new ol.source.XYZ({
    url: "https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
  }),
});

// 2. WMS helper
const wmsUrl = "https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_01/wms";
const workspace = "gisgeoserver_01";

// Build one GeoServer WMS tile layer from workspace.
function createWmsLayer(title, layerName, visible = false) {
  return new ol.layer.Tile({
    title: title,
    visible: visible,
    source: new ol.source.TileWMS({
      url: wmsUrl,
      params: {
        SERVICE: "WMS",
        VERSION: "1.1.1",
        LAYERS: `${workspace}:${layerName}`,
        STYLES: "",
        FORMAT: "image/png",
        TRANSPARENT: true,
        TILED: true,
      },
      serverType: "geoserver",
      crossOrigin: "anonymous",
    }),
  });
}

// 3. Overlay layers by category
const categoryCamsLayers = new ol.layer.Group({
  title: "CAMS Monthly",
  fold: "open",
  layers: [
    createWmsLayer("CAMS NO2 2023-12", "Germany_CAMS_no2_2023_12"),
    createWmsLayer("CAMS PM10 2023-12", "Germany_CAMS_pm10_2023_12"),
    createWmsLayer("CAMS PM2.5 2023-12", "Germany_CAMS_pm2p5_2023_12"),
  ],
});

const categoryAverageLayers = new ol.layer.Group({
  title: "Annual Average",
  fold: "open",
  layers: [
    createWmsLayer("Average NO2 2023", "Germany_average_no2_2023"),
    createWmsLayer("Average PM10 2023", "Germany_average_pm10_2023"),
    createWmsLayer("Average PM2.5 2023", "Germany_average_pm2p5_2023"),
  ],
});

const categoryLandCoverLayers = new ol.layer.Group({
  title: "Land Cover",
  fold: "open",
  layers: [
    createWmsLayer("Land Cover 2021", "Germany_lc_2021"),
    createWmsLayer("Land Cover 2023", "Germany_lc_2023"),
    createWmsLayer("Land Cover Change 2021-2023", "Germany_LCC_2021_2023"),
  ],
});

const categoryAmacLayers = new ol.layer.Group({
  title: "AMAC",
  fold: "open",
  layers: [
    createWmsLayer("NO2 2021-2023 AMAC", "Germany_no2_2021_2023_AMAC_map"),
    createWmsLayer("PM10 2021-2023 AMAC", "Germany_pm10_2021_2023_AMAC_map"),
    createWmsLayer("PM2.5 2021-2023 AMAC", "Germany_pm2p5_2021_2023_AMAC_map"),
  ],
});

const categoryBivariateLayers = new ol.layer.Group({
  title: "Bivariate",
  fold: "open",
  layers: [
    createWmsLayer("NO2 2023 Bivariate", "Germany_no2_2023_bivariate"),
    createWmsLayer("PM10 2023 Bivariate", "Germany_pm10_2023_bivariate"),
    createWmsLayer("PM2.5 2023 Bivariate", "Germany_pm2p5_2023_bivariate"),
  ],
});

const categoryChartLayers = new ol.layer.Group({
  title: "Charts",
  fold: "open",
  layers: [
    createWmsLayer("NO2 2023 Chart", "Germany_no2_2023_chart"),
    createWmsLayer("PM10 2023 Chart", "Germany_pm10_2023_chart"),
    createWmsLayer("PM2.5 2023 Chart", "Germany_pm2p5_2023_chart"),
  ],
});

const categoryConcentrationLayers = new ol.layer.Group({
  title: "Concentration Maps",
  fold: "open",
  layers: [
    createWmsLayer("NO2 Concentration Map 2023", "Germany_no2_concentration_map_2023"),
    createWmsLayer("PM10 Concentration Map 2023", "Germany_pm10_concentration_map_2023"),
    createWmsLayer("PM2.5 Concentration Map 2023", "Germany_pm2p5_concentration_map_2023"),
  ],
});

// 4. Overlay layers by pollutant/type
const typeNo2Layers = new ol.layer.Group({
  title: "NO2",
  fold: "open",
  layers: [
    createWmsLayer("CAMS NO2 2023-12", "Germany_CAMS_no2_2023_12"),
    createWmsLayer("Average NO2 2023", "Germany_average_no2_2023"),
    createWmsLayer("NO2 2021-2023 AMAC", "Germany_no2_2021_2023_AMAC_map"),
    createWmsLayer("NO2 2023 Bivariate", "Germany_no2_2023_bivariate"),
    createWmsLayer("NO2 2023 Chart", "Germany_no2_2023_chart"),
    createWmsLayer("NO2 Concentration Map 2023", "Germany_no2_concentration_map_2023"),
  ],
});

const typePm10Layers = new ol.layer.Group({
  title: "PM10",
  fold: "open",
  layers: [
    createWmsLayer("CAMS PM10 2023-12", "Germany_CAMS_pm10_2023_12"),
    createWmsLayer("Average PM10 2023", "Germany_average_pm10_2023"),
    createWmsLayer("PM10 2021-2023 AMAC", "Germany_pm10_2021_2023_AMAC_map"),
    createWmsLayer("PM10 2023 Bivariate", "Germany_pm10_2023_bivariate"),
    createWmsLayer("PM10 2023 Chart", "Germany_pm10_2023_chart"),
    createWmsLayer("PM10 Concentration Map 2023", "Germany_pm10_concentration_map_2023"),
  ],
});

const typePm25Layers = new ol.layer.Group({
  title: "PM2.5",
  fold: "open",
  layers: [
    createWmsLayer("CAMS PM2.5 2023-12", "Germany_CAMS_pm2p5_2023_12"),
    createWmsLayer("Average PM2.5 2023", "Germany_average_pm2p5_2023"),
    createWmsLayer("PM2.5 2021-2023 AMAC", "Germany_pm2p5_2021_2023_AMAC_map"),
    createWmsLayer("PM2.5 2023 Bivariate", "Germany_pm2p5_2023_bivariate"),
    createWmsLayer("PM2.5 2023 Chart", "Germany_pm2p5_2023_chart"),
    createWmsLayer("PM2.5 Concentration Map 2023", "Germany_pm2p5_concentration_map_2023"),
  ],
});

const typeLandCoverLayers = new ol.layer.Group({
  title: "Land Cover",
  fold: "open",
  layers: [
    createWmsLayer("Land Cover 2021", "Germany_lc_2021"),
    createWmsLayer("Land Cover 2023", "Germany_lc_2023"),
    createWmsLayer("Land Cover Change 2021-2023", "Germany_LCC_2021_2023"),
  ],
});

// 5. Layer groups
// Base map group used by the layer switcher.
const basemapLayers = new ol.layer.Group({
  title: "Base Maps",
  layers: [satelliteLayer, osmLayer, cartoLayer],
});

// Overlay group organized by map/data product category.
const overlayByCategory = new ol.layer.Group({
  title: "Overlay by Category",
  visible: true,
  fold: "open",
  layers: [
    categoryCamsLayers,
    categoryAverageLayers,
    categoryLandCoverLayers,
    categoryAmacLayers,
    categoryBivariateLayers,
    categoryChartLayers,
    categoryConcentrationLayers,
  ],
});

// Alternative overlay group organized by pollutant type.
const overlayByType = new ol.layer.Group({
  title: "Overlay by Pollutant",
  visible: true,
  fold: "open",
  layers: [typeNo2Layers, typePm10Layers, typePm25Layers, typeLandCoverLayers],
});

// 6. Map
// Initialize the map with Germany as the default view.
const map = new ol.Map({
  target: "map",
  layers: [basemapLayers, overlayByCategory],
  view: new ol.View({
    center: ol.proj.fromLonLat([10.4, 51.2]),
    zoom: 6,
  }),
});

// 7. Controls
// Standard OpenLayers controls, quick zoom button for Germany, pointer cursor
map.addControl(new ol.control.ScaleLine());
map.addControl(new ol.control.FullScreen());
map.addControl(
  new ol.control.ZoomToExtent({
    label: "🇩🇪",
    tipLabel: "Zoom to Germany",
    extent: ol.proj.transformExtent([5.0, 46.5, 16.0, 55.8], "EPSG:4326", "EPSG:3857"),
  }),
);
map.on("pointermove", function (event) {
  var hit = getFirstVisibleWmsLayer() != null;
  map.getTargetElement().style.cursor = hit ? "pointer" : "";
});

map.addControl(
  new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: "EPSG:4326",
    className: "custom-control",
    placeholder: "0.0000, 0.0000",
  }),
);

const layerSwitcher = new ol.control.LayerSwitcher({});
map.addControl(layerSwitcher);

// Custom sorting control for switching between the two overlay group structures.
const groupingControl = document.createElement("div");
groupingControl.className = "grouping-control ol-control";
groupingControl.innerHTML = `
  <div class="sort-title">Sort</div>
  <label>
    <input type="radio" name="overlaySort" id="sortCategory" checked>
    By category
  </label>
  <label>
    <input type="radio" name="overlaySort" id="sortPollutant">
    By pollutant
  </label>
`;

map.addControl(
  new ol.control.Control({
    element: groupingControl,
  }),
);

// Legend panel; content is refreshed when visible WMS layers change.
const legendControl = document.createElement("div");
legendControl.className = "legend-control ol-control";
legendControl.innerHTML = `
  <div class="legend-title">Legend</div>
  <div id="legend-content">No overlay selected</div>
`;

map.addControl(
  new ol.control.Control({
    element: legendControl,
  }),
);

// Popup used to show WMS feature information after a map click.
var container = document.createElement("div");
container.id = "popup";
container.className = "ol-popup";
container.innerHTML = `
  <a href="#" id="popup-closer" class="ol-popup-closer">x</a>
  <div id="popup-content"></div>
`;
document.getElementById("map").appendChild(container);

var content = document.getElementById("popup-content");
var closer = document.getElementById("popup-closer");
var popup = new ol.Overlay({
  element: container,
});

map.addOverlay(popup);

closer.onclick = function () {
  popup.setPosition(undefined);
  closer.blur();
  return false;
};

// Collect visible WMS layers from nested layer groups.
function getVisibleWmsLayers(layers, visibleLayers) {
  layers.forEach(function (layer) {
    if (!layer.getVisible()) {
      return;
    }

    if (layer instanceof ol.layer.Group) {
      getVisibleWmsLayers(layer.getLayers(), visibleLayers);
    } else if (layer.getSource() instanceof ol.source.TileWMS) {
      visibleLayers.push(layer);
    }
  });

  return visibleLayers;
}

// Use the first visible WMS layer as the active layer for legend and GetFeatureInfo.
function getFirstVisibleWmsLayer() {
  const visibleLayers = getVisibleWmsLayers(map.getLayers(), []);

  if (visibleLayers.length === 0) {
    return null;
  }

  return visibleLayers[0];
}

// Update the legend image using GeoServer's GetLegendGraphic response.
function updateLegend() {
  var overlayLayer = getFirstVisibleWmsLayer();
  var legendContent = document.getElementById("legend-content");

  if (overlayLayer == null) {
    legendControl.style.display = "none";
    return;
  }

  legendControl.style.display = "block";

  var layerTitle = overlayLayer.get("title");
  var legendUrl = overlayLayer.getSource().getLegendUrl(map.getView().getResolution(), {
    FORMAT: "image/png",
  });

  legendContent.innerHTML =
    '<div class="legend-item">' +
    "<div>" +
    layerTitle +
    "</div>" +
    '<img src="' +
    legendUrl +
    '" alt="' +
    layerTitle +
    '">' +
    "</div>";
}

// Keep the legend synchronized with layer visibility changes.
function listenLayerChanges(layer) {
  layer.on("change:visible", updateLegend);

  if (layer instanceof ol.layer.Group) {
    layer.getLayers().forEach(function (childLayer) {
      listenLayerChanges(childLayer);
    });
  }
}

listenLayerChanges(overlayByCategory);
listenLayerChanges(overlayByType);
updateLegend();

// Swap the visible overlay tree to category-based grouping.
document.getElementById("sortCategory").addEventListener("change", function () {
  if (this.checked) {
    map.getLayers().setAt(1, overlayByCategory);
    layerSwitcher.renderPanel();
    updateLegend();
  }
});

// Swap the visible overlay tree to pollutant-based grouping.
document.getElementById("sortPollutant").addEventListener("change", function () {
  if (this.checked) {
    map.getLayers().setAt(1, overlayByType);
    layerSwitcher.renderPanel();
    updateLegend();
  }
});

// Query the active WMS layer and display feature information in the popup.
map.on("singleclick", function (event) {
  var overlayLayer = getFirstVisibleWmsLayer();

  if (overlayLayer == null) {
    popup.setPosition(event.coordinate);
    content.innerHTML = "<h5>Map Event</h5><br><span>No visible overlay layer</span>";
    return;
  }

  var view = map.getView();
  var url = overlayLayer.getSource().getFeatureInfoUrl(event.coordinate, view.getResolution(), view.getProjection(), {
    INFO_FORMAT: "text/html",
    FEATURE_COUNT: 5,
  });

  popup.setPosition(event.coordinate);
  content.innerHTML = "<h5>" + overlayLayer.get("title") + "</h5><br><span>Loading...</span>";

  fetch(url)
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      content.innerHTML = "<h5>" + overlayLayer.get("title") + "</h5><br>" + text;
    })
    .catch(function () {
      content.innerHTML = "<h5>" + overlayLayer.get("title") + "</h5><br><span>No feature information</span>";
    });
});
