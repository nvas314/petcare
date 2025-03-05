import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsSidebarComponent } from './posts-sidebar.component';

describe('PostsSidebarComponent', () => {
  let component: PostsSidebarComponent;
  let fixture: ComponentFixture<PostsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
