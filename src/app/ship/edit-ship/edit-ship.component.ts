import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Paint } from 'src/app/paint/paint';
import { PaintService } from 'src/app/paint/paint.service';
import { Ship } from '../ship';
import { ShipService } from '../ship.service';

@Component({
  selector: 'app-edit-ship',
  templateUrl: './edit-ship.component.html',
  styleUrls: ['./edit-ship.component.css']
})
export class EditShipComponent implements OnInit, OnDestroy {

  @Input() ship!: Ship;
  paints!: Paint[];
  activePaints!: Paint[];

  routeSubscription!: Subscription;
  getShipSubscription!: Subscription;
  getPaintSubscription!: Subscription;
  editShipSubscription!: Subscription;

  shipForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    mmsi: ["", [Validators.required, Validators.minLength(3)]],
  })

  voorschip!: { part: String, paint: Paint; selected: boolean; }[][];
  middenschip!: { part: String, paint: Paint; selected: boolean; }[][];
  achterschip!: { part: String, paint: Paint; selected: boolean; }[][];
  overigen!: { part: String, paint: Paint; selected: boolean; }[][];

  parts = ["Voorschip", "Middenschip", "Achterschip", "Overigen"];
  parts2: any;
  checked = [];

  constructor(
    private shipService: ShipService,
    private paintService: PaintService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private location: Location,
    private router: Router,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.getShip();
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getShipSubscription?.unsubscribe();
    this.getPaintSubscription?.unsubscribe();
    this.editShipSubscription?.unsubscribe();
  }

  getShip(): void {
    this.routeSubscription = this.route.params.subscribe((param: any) => {
      const id = param["id"];

      this.getShipSubscription = this.shipService.getShip(id)
        .subscribe((ship: Ship) => {
          this.ship = ship

          this.getPaints();
        });
    });
  }

  goBack(): void {
    this.location.back();
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
        

        const middenschipParts = ["Gangboorden", "Tankdek", "Dennenboom"]
        const middenschipArray: { part: String, paint: Paint; selected: boolean; }[][] = [];
        middenschipParts.forEach((part) => {
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

        this.getSelected(this.ship.voorschip);
        this.getSelected(this.ship.middenschip);
        this.getSelected(this.ship.achterschip);
        this.getSelected(this.ship.overigen);
      });
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

  editShip(): void {
    if (this.shipForm.invalid) return;

    const { name, mmsi } = this.ship;

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

    this.editShipSubscription = this.shipService
      .editShip(this.ship._id, ship).subscribe((ship: any) => {
        this.toastr.success("Schip is geupdated! " + name, "Succes!");
        this.router.navigate(["/ship"]);
      });
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

  getSelected(input: any[][]) {
    for (let i = 0 ; i < 4 ; i++) {
      this.parts2[i].paints.forEach((paint: any) => {
        input.forEach((shipPaint: any) => {
          paint.forEach((paint2: any) => {
            const name = paint2.paint.name;
  
            if ((name === shipPaint.paint.name) && (shipPaint.part === paint2.part)) {
              paint2.selected = true;
            }
          }) 
        });
      });
    }
  }
}
