import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Paint } from 'src/app/paint/paint';
import { PaintService } from 'src/app/paint/paint.service';
import { ShipService } from '../ship.service';

@Component({
  selector: 'app-create-ship',
  templateUrl: './create-ship.component.html',
  styleUrls: ['./create-ship.component.css']
})
export class CreateShipComponent implements OnInit, OnDestroy {

  paints!: Paint[];

  shipTypeArray: string[] = ["Container", "Poederschip"];
  shipType: string = "Container";

  voorschip!: { part: String, paint: Paint; selected: boolean; }[][];
  middenschip!: { part: String, paint: Paint; selected: boolean; }[][];
  achterschip!: { part: String, paint: Paint; selected: boolean; }[][];
  overigen!: { part: String, paint: Paint; selected: boolean; }[][];

  parts = ["Voorschip", "Middenschip", "Achterschip", "Overigen"];
  parts2: any;
  checked = [];

  createShipSubscription!: Subscription;
  getPaintSubscription!: Subscription;

  shipForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    mmsi: ["", [Validators.required, Validators.minLength(3)]],
    shipType: ["Container", [Validators.required]],
  })

  constructor(
    private fb: UntypedFormBuilder,
    private shipService: ShipService,
    private paintService: PaintService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPaints();
 }

  ngOnDestroy(): void {
    this.createShipSubscription?.unsubscribe();
    this.getPaintSubscription?.unsubscribe();
  }

  getPaints(): void {
    this.getPaintSubscription = this.paintService
      .getPaints()
      .subscribe((paints: any[]) => {
        this.paints = paints.map((paint: any) => {
          return {
            ...paint,
            selected: false
          }
        });

        const voorschipParts = ["Boeing", "Voorwoning", "Voordek", "Potdeksel", "Letters", "Woningroefdek", "Ankelier"]
        const voorschipArray: { part: String, paint: Paint; selected: boolean; }[][] = [];
        voorschipParts.forEach((part) => {
          voorschipArray.push(paints.map((paint: any) => {
              return {
                part: part,
                paint: paint,
                selected: false
              } 
          }));
        });
        this.voorschip = voorschipArray;

        const middenSchipParts = {
          "Container": ["Ruim"],
          "Poederschip": ["Gangboorden", "Tankdek", "Dennenboom"]
        };

        let middenschipPart: string[] = middenSchipParts[this.shipType as keyof typeof middenSchipParts];

        const middenschipArray: { part: String, paint: Paint; selected: boolean; }[][] = [];
        middenschipPart.forEach((part) => {
          middenschipArray.push(paints.map((paint: any) => {
              return {
                part: part,
                paint: paint,
                selected: false
              } 
          }));
        });
        this.middenschip = middenschipArray;

        const achterschipParts = ["Gangboorden", "Boeing", "Potdeksel", "Woning", "Woningroefdek", "Autokraan", "Ankelier", "Erfschild", "Stuurhutpaal", "Spiegel"]
        const achterschipArray: { part: String, paint: Paint; selected: boolean; }[][] = [];
        achterschipParts.forEach((part) => {
          achterschipArray.push(paints.map((paint: any) => {
              return {
                part: part,
                paint: paint,
                selected: false
              } 
          }));
        });
        this.achterschip = achterschipArray;

        const overigenParts = ["Ballast tanken", "Zijen van het schip", "Ruimen", "Machinekamer", "Voorpiek", "Achterpiek"]
        const overigenArray: { part: String, paint: Paint; selected: boolean; }[][] = [];
        overigenParts.forEach((part) => {
          overigenArray.push(paints.map((paint: any) => {
              return {
                part: part,
                paint: paint,
                selected: false
              } 
          }));
        });
        this.overigen = overigenArray;

        this.parts2 = [{
            name: "Voorschip",
            paints: this.voorschip},{
            name: "Middenschip",
            paints: this.middenschip},{
            name: "Achterschip",
            paints: this.achterschip},{
            name: "Overigen",
            paints: this.overigen
        }];
      });
  }

  change(event: any) {
    this.shipType = event;

    this.getPaints();
  }

  changeBox(event: any): void {
    const { checked } = event;
    const { name } = event.source;

    const [schipdeel, part, verf] = name.split("-");

    const clickedShipPart = this.parts2
      .find((shipPart: { name: any; }) => shipPart.name === schipdeel);

    let found;

    for (let array of clickedShipPart.paints) {      
      const f = array.find((x: any) => x.part == part && x.paint.name == verf);

      if (f) {
        found = f;
        break;
      }
    }

    if (found) {
      found.selected = checked;
    } 
  }

  sendForm(): void {
    if (this.shipForm.invalid) {
      return;
    }

    const { name, mmsi } = this.shipForm.value;

    const voorschip = this.getChecked(this.parts2[0].paints)
    const middenschip = this.getChecked(this.parts2[1].paints)
    const achterschip = this.getChecked(this.parts2[2].paints)
    const overigen = this.getChecked(this.parts2[3].paints)

    const ship = {
      name,
      mmsi,
      voorschip,
      middenschip,
      achterschip,
      overigen
    }

    this.createShipSubscription = this.shipService
      .createShip(ship)
      .subscribe({ 
        next: (ship: any) => {
          this.toastr.success("Schip is aangemaakt! " + ship._id, "Succes!");
          this.router.navigate(["/ship"]);
        }, 
        error: (err: any) => {
          this.toastr.error("Missing name or mssi", "Error!");
        }});
  }

  getChecked(input: any) {
    let checked = [];

    for (let x of input) {
      for (let y of x) {
        if (y.selected) {
          delete y.selected;
          checked.push(y);
        }
      }
    }

    return checked;
  }

}
