import { Location } from '@angular/common';
import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Paint } from '../paint';
import { PaintService } from '../paint.service';

@Component({
  selector: 'app-edit-paint',
  templateUrl: './edit-paint.component.html',
  styleUrls: ['./edit-paint.component.css']
})
export class EditPaintComponent implements OnInit, OnDestroy {

  @Input() paint?: Paint;

  routeSubscription!: Subscription;
  getPaintSubscription!: Subscription;
  editPaintSubscription!: Subscription;
  deletePaintSubscription!: Subscription;

  paintForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    price: ["", [Validators.required, Validators.min(0)]],
    url: ["", [Validators.required, Validators.minLength(3)]],
    color: ["", [Validators.required, Validators.minLength(3)]],
    amount: ["", [Validators.required, Validators.min(0)]]
  });

  constructor(
    private paintService: PaintService,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private router: Router,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.getPaint();
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getPaintSubscription?.unsubscribe();
    this.editPaintSubscription?.unsubscribe();
    this.deletePaintSubscription?.unsubscribe();
  }

  getPaint(): void {
    this.routeSubscription = this.route.params.subscribe((param: any) => {
      const id = param["id"];

      this.getPaintSubscription = this.paintService.getPaint(id)
        .subscribe((paint: Paint) => this.paint = paint);
    }) 
  }

  savePaint(id: string): void {
    if (this.paint && this.paintForm.valid) {
      this.editPaintSubscription = this.paintService.editPaint(id, this.paint)
        .subscribe((paint: Paint) => {
          this.paint = paint
        
          this.toastr.success(`Paint with id: ${this.paint?._id} updated`, "Paint updated",  {
            progressBar: true
          });
    
          this.router.navigate(["/paint"]);
        });
    }
  }

  goBack(): void {
    this.location.back();
  }

  deletePaint(id: string): void {
    this.deletePaintSubscription = this.paintService
      .deletePaint(id)
      .subscribe(() => {
        this.toastr.success(`Paint with id: ${id} deleted`, "Paint deleted",  {
          progressBar: true
        });
    
        this.router.navigate(["/paint"]);
      });
  }

}
