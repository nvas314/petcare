import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAnnouncementComponent } from './show-announcement.component';

describe('ShowAnnouncementComponent', () => {
  let component: ShowAnnouncementComponent;
  let fixture: ComponentFixture<ShowAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAnnouncementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
