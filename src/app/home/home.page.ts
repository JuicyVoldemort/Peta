
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  map!: L.Map;
  marker!: L.Marker;
  osmLayer!: L.TileLayer;
  topoLayer!: L.TileLayer;          // New basemap for Topographic Map
  cyclingLayer!: L.TileLayer;       // New basemap for Cycling Map

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    if (!this.map) {
      this.initializeMap();
    }
  }

  initializeMap() {
    // Initialize the map
    this.map = L.map('mapId').setView([-8.652059736425091, 115.22757246792544], 15
    );

    // Add the OpenStreetMap tile layer (default layer)
    this.osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);

    // Prepare other basemaps but don't add them yet

    // New OpenTopoMap (Topographic)
    this.topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenTopoMap contributors',
      maxZoom: 17
    });

    // New CyclOSM (Cycling Map)
    this.cyclingLayer = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
      attribution: '&copy; CyclOSM contributors',
      maxZoom: 19
    });

    // Add a default marker
    const defaultLocation: L.LatLngExpression = [-8.652059736425091, 115.22757246792544];
    this.marker = L.marker(defaultLocation).addTo(this.map)
      .bindPopup('<b>Sumerta Kauh</b><br>Kota Denpasar')
      .openPopup();

    // Add a click event listener to the map to add markers dynamically
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.addMarker(e.latlng);
    });
  }

  // Function to change the basemap based on user selection
  changeBasemap(event: any) {
    const selectedBasemap = event.detail.value;
    console.log('Selected basemap:', selectedBasemap);

    // Remove the existing basemap layers
    if (this.map.hasLayer(this.osmLayer)) {
      this.map.removeLayer(this.osmLayer);
    }
    if (this.map.hasLayer(this.topoLayer)) {
      this.map.removeLayer(this.topoLayer);
    }
    if (this.map.hasLayer(this.cyclingLayer)) {
      this.map.removeLayer(this.cyclingLayer);
    }

    // Add the selected basemap
    if (selectedBasemap === 'osm') {
      this.osmLayer.addTo(this.map);
    } else if (selectedBasemap === 'topo') {
      this.topoLayer.addTo(this.map);
    } else if (selectedBasemap === 'cycling') {
      this.cyclingLayer.addTo(this.map);
    }
  }
// Function to add a marker on click
addMarker(latlng: L.LatLng) {
  if (this.marker) {
    this.marker.remove();  // Remove the previous marker if any
  }
  this.marker = L.marker(latlng).addTo(this.map)
    .bindPopup(`<b>Location:</b><br>Lat: ${latlng.lat}, Lng: ${latlng.lng}`)
    .openPopup();
}
}