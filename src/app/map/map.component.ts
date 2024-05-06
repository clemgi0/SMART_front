import { Component, AfterViewInit, inject } from '@angular/core';
import * as L from 'leaflet';
import { LoginService } from '../login.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: L.Map | L.LayerGroup<any> | undefined;
  loginService: LoginService = inject(LoginService);
  user_id: string | undefined;
  user: User = { id: 0, access_token: '', home:{lat: 0, lng: 0}, tracker: {id: 0, status: 0}};

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.user!.home.lat, this.user!.home.lng ],
      zoom: 15
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
      this.user.id = params['user_id'];
    });

    this.route.queryParams.subscribe(params => {
      this.user.access_token = params['access_token'];
    });
  }

  async ngAfterViewInit(): Promise<void> {
    const res = await this.loginService.getHome(this.user.access_token);
    this.setUser(res);
    this.initMap();

    var marker = L.marker([this.user.home.lat, this.user.home.lng]).addTo(this.map!);
    marker.bindPopup("<b>Home</b><br>Pop me").openPopup();

    this.map?.on('click', this.onMapClick.bind(this));
  }

  onMapClick(e :L.LeafletMouseEvent) {
    var popup = L.popup();
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(this.map as L.Map);
  }

  setUser(res: any) {
    this.user.home.lat = res[0].latitude;
    this.user.home.lng = res[0].longitude;
    this.user.tracker.id = res[0].id;
    this.user.tracker.status = res[0].status;
  }
}