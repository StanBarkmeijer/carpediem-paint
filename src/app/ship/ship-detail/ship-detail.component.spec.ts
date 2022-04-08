import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { ShipDetailComponent } from './ship-detail.component';

describe('ShipDetailComponent', () => {
  let component: ShipDetailComponent;
  let fixture: ComponentFixture<ShipDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipDetailComponent ],
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
    fixture = TestBed.createComponent(ShipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
