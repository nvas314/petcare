import { NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-input',
  imports: [NgIf],
  templateUrl: './map-input.component.html',
  styleUrl: './map-input.component.css'
})
export class MapInputComponent implements OnInit, AfterViewInit {

  @Output() postiionChanged = new EventEmitter<{lat:number,lon:number}>
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @Input() lat: number = 38;
  @Input() lon: number = 22;

  map!: L.Map;
  userMarker!: L.Marker;
  clickedLat: number | null = null;
  clickedLon: number | null = null;

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    if (!this.map) {
      this.map = L.map(this.mapContainer.nativeElement).setView([38, 22], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.map.on('click', (event: L.LeafletMouseEvent) => {
        this.addMarker(event.latlng.lat, event.latlng.lng);
      });
    }
  }

  addMarker(lat: number, lon: number): void {
    if (this.userMarker) {
      this.map.removeLayer(this.userMarker);
    }
    this.userMarker = L.marker([lat, lon]).addTo(this.map);
    this.userMarker.bindPopup(`Latitude: ${lat}, Longitude: ${lon}`).openPopup();
    this.clickedLat = lat;
    this.clickedLon = lon;
    this.onPositionChange()
  }

  onPositionChange(){
    this.postiionChanged.emit({lon:this.clickedLon!,lat:this.clickedLat!})
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.map == null){
      return
    }
    this.addMarker(this.lat,this.lon)
    }
}
