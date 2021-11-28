import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaintComponent } from './edit-paint.component';

describe('EditPaintComponent', () => {
  let component: EditPaintComponent;
  let fixture: ComponentFixture<EditPaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
