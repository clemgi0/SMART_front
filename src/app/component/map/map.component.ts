import { Component, AfterViewInit, inject } from '@angular/core';
import * as L from 'leaflet';
import { User } from '../../interface/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Tracker } from '../../interface/tracker';
import { Position } from '../../interface/position';
import { MapService } from '../../service/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: L.Map | L.LayerGroup<any> | undefined;
  mapService: MapService = inject(MapService);
  router: Router = inject(Router);
  user_id: string | undefined;
  user: User = { id: 0, access_token: ''};
  tracker: Tracker = { id: 0, status: 0, home_latitude: 0, home_longitude: 0, name: ''};
  positionHistory: L.Marker[] = [];
  homeIcon = L.icon({
    iconUrl: '../assets/logo.png',
    iconSize: [20, 20],
  });

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.tracker.home_latitude, this.tracker.home_longitude],
      zoom: 6
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      const jsonObj = JSON.parse(params['user']);
      this.user = jsonObj as User;
    });

    this.route.queryParams.subscribe(params => {
      const jsonObj = JSON.parse(params['tracker']);
      this.tracker = jsonObj as Tracker;
    });
  }

  async ngAfterViewInit(): Promise<void> {
    this.initMap();
    
    var marker = L.marker([this.tracker.home_latitude, this.tracker.home_longitude], {icon: this.homeIcon}).addTo(this.map!);
    marker.bindPopup("<b>Home</b><br>Pop me", {autoClose: false}).openPopup();
    
    if(this.tracker.status) {
      const res = await this.mapService.getHistoryPosition(this.user.access_token, this.tracker.id);

      res.forEach((position: any) => {
        const markerPos = L.marker([position.latitude, position.longitude]).addTo(this.map!);
        markerPos.bindPopup(`Timestamp: ${position.timestamp - res[0].timestamp}`, {autoClose: false}).openPopup();
        this.positionHistory.push(markerPos);
      });
    }

    this.map?.on('click', this.onMapClick.bind(this));
  }

  onMapClick(e :L.LeafletMouseEvent) {
    var popup = L.popup();
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(this.map as L.Map);
  }

  goBack() {
    const userJson = JSON.stringify(this.user);
    this.router.navigate(['/list-tracker'], { queryParams: { user: userJson} })
  }
}