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
  userId: string | undefined;
  user: User = { id: 0, username: '', password: '', lat: 0, lng: 0 };

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.user!.lat, this.user!.lng ],
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
      this.userId = params['id'];
    });
  }

  async ngAfterViewInit(): Promise<void> {
    const tempUser = await this.loginService.getUserById(this.userId!);
    this.setUser(tempUser);
    this.initMap();

    var marker = L.marker([this.user.lat, this.user.lng]).addTo(this.map!);
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

  setUser(tempUser: any) {
    this.user.id = tempUser.id;
    this.user.username = tempUser.username;
    this.user.password = tempUser.password;
    this.user.lat = tempUser.home.lat;
    this.user.lng = tempUser.home.lng;
  }
}