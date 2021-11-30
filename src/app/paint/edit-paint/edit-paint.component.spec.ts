import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { EditPaintComponent } from './edit-paint.component';

describe('EditPaintComponent', () => {
  let component: EditPaintComponent;
  let fixture: ComponentFixture<EditPaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPaintComponent ],
      imports: [ RouterTestingModule, ToastrModule.forRoot() ]
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

  it('should correctly render the passed @Input value', () => {  
    component.paint = { 
      id: 0,
      name: "Nelfamar Supertop Gloss Sneeuwwit 1 comp",
      price: 15,
      url: "https://www.verfgroothandel.nl/nelfamar-supertop-1.html",
      color: "#F3F6FB"
    };

    // const list: Array<string> = [
    //   component.paint.name,
    //   component.paint.price + "",
    //   component.paint.url,
    //   component.paint.color
    // ];

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector("mat-card-title").innerText)
      .toBe("Nelfamar Supertop Gloss Sneeuwwit 1 comp")

    expect(compiled.querySelector("mat-card-subtitle").innerText)
      .toBe("€15.00")

    // compiled
    //   .querySelector(".mat-input-element")
    //   .forEach((el: any, idx: number) => console.log(el, idx));
  });
});
