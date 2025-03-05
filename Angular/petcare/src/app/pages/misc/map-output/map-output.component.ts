import { AfterViewInit, Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-output',
  imports: [],
  templateUrl: './map-output.component.html',
  styleUrl: './map-output.component.css'
})
export class MapOutputComponent implements AfterViewInit {
  private map!: L.Map;
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @Input() lon?: number;
  @Input() lat?: number;

  ngAfterViewInit(): void {
    if(this.lon ==null) this.lon = 40
    if(this.lat ==null) this.lat = 40

    this.map = L.map(this.mapContainer.nativeElement).setView([this.lat, this.lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([this.lat,this.lon]).addTo(this.map)
      .bindPopup('Here')
      .openPopup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.map == null){
      return
    }
    L.marker([this.lat!,this.lon!]).addTo(this.map)
      .bindPopup('Here')
      .openPopup();
    }
}
