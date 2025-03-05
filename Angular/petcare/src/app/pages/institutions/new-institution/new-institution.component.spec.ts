import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInstitutionComponent } from './new-institution.component';

describe('NewInstitutionComponent', () => {
  let component: NewInstitutionComponent;
  let fixture: ComponentFixture<NewInstitutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewInstitutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
