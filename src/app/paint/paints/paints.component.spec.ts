import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { PaintsComponent } from './paints.component';

describe('PaintsComponent', () => {
  let component: PaintsComponent;
  let fixture: ComponentFixture<PaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintsComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, ToastrModule.forRoot() ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
