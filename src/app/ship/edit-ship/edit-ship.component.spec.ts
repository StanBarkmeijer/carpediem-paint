import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShipComponent } from './edit-ship.component';

describe('EditShipComponent', () => {
  let component: EditShipComponent;
  let fixture: ComponentFixture<EditShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditShipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
