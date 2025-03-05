import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBoxSecondaryComponent } from './post-box-secondary.component';

describe('PostBoxSecondaryComponent', () => {
  let component: PostBoxSecondaryComponent;
  let fixture: ComponentFixture<PostBoxSecondaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostBoxSecondaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostBoxSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
