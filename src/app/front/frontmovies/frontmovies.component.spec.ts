import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontmoviesComponent } from './frontmovies.component';

describe('FrontmoviesComponent', () => {
  let component: FrontmoviesComponent;
  let fixture: ComponentFixture<FrontmoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontmoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontmoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
