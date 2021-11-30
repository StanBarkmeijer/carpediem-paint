import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { CreatePaintComponent } from './create-paint.component';

describe('CreatePaintComponent', () => {
  let component: CreatePaintComponent;
  let fixture: ComponentFixture<CreatePaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePaintComponent ],
      imports: [ 
        RouterTestingModule, 
        FormsModule, 
        ReactiveFormsModule, 
        ToastrModule.forRoot() 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
