import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectShipComponent } from './select-ship.component';

describe('SelectShipComponent', () => {
  let component: SelectShipComponent;
  let fixture: ComponentFixture<SelectShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectShipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
