import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridcreationComponent } from './gridcreation.component';

describe('GridcreationComponent', () => {
  let component: GridcreationComponent;
  let fixture: ComponentFixture<GridcreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridcreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
