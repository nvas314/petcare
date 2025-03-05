import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOutputComponent } from './map-output.component';

describe('MapOutputComponent', () => {
  let component: MapOutputComponent;
  let fixture: ComponentFixture<MapOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapOutputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
