import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnnouncementComponent } from './new-announcement.component';

describe('NewAnnouncementComponent', () => {
  let component: NewAnnouncementComponent;
  let fixture: ComponentFixture<NewAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAnnouncementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
