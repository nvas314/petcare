import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNewComponent } from './post-new.component';

describe('PostNewComponent', () => {
  let component: PostNewComponent;
  let fixture: ComponentFixture<PostNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
