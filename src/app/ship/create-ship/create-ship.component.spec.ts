import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { CreateShipComponent } from './create-ship.component';

describe('CreateShipComponent', () => {
  let component: CreateShipComponent;
  let fixture: ComponentFixture<CreateShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateShipComponent ],
      imports: [ 
        RouterTestingModule, 
        FormsModule, 
        ReactiveFormsModule, 
        ToastrModule.forRoot(),
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
