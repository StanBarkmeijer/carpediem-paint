import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { PaintDetailComponent } from './paint-detail.component';

describe('PaintDetailComponent', () => {
  let component: PaintDetailComponent;
  let fixture: ComponentFixture<PaintDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintDetailComponent ],
      imports: [ RouterTestingModule, ToastrModule.forRoot() ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintDetailComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly render the passed @Input value', () => {  
    component.paint = { 
      id: 0,
      name: "Nelfamar Supertop Gloss Sneeuwwit 1 comp",
      price: 15,
      url: "https://www.verfgroothandel.nl/nelfamar-supertop-1.html",
      color: "#F3F6FB"
    };

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    
    expect(compiled.querySelector("mat-card-title").innerText)
      .toBe("Paint information: NELFAMAR SUPERTOP GLOSS SNEEUWWIT 1 COMP")
  });
  
  it('should show proper paint price with EUR currency', () => {
    component.paint = { 
      id: 0,
      name: "Nelfamar Supertop Gloss Sneeuwwit 1 comp",
      price: 15,
      url: "https://www.verfgroothandel.nl/nelfamar-supertop-1.html",
      color: "#F3F6FB"
    };

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    
    expect(compiled.querySelector("mat-card-subtitle").innerText)
      .toBe("€15.00")
  });
});
