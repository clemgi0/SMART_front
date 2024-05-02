import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: L.Map | L.LayerGroup<any> | undefined;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 45.782910, 4.875903 ],
      zoom: 16
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();

    var marker = L.marker([45.78387073445425, 4.8746414388750345]).addTo(this.map!);
    marker.bindPopup("<b>K-Fêt!</b><br>Pop me").openPopup();

    this.map?.on('click', this.onMapClick.bind(this));
  }

  onMapClick(e :L.LeafletMouseEvent) {
    var popup = L.popup();
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(this.map as L.Map);
  }
}