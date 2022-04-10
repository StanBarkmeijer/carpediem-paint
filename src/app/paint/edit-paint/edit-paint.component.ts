import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paint } from '../paint';
import { PaintService } from '../paint.service';

@Component({
  selector: 'app-edit-paint',
  templateUrl: './edit-paint.component.html',
  styleUrls: ['./edit-paint.component.css']
})
export class EditPaintComponent implements OnInit {

  @Input() paint?: Paint;

  paintForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    price: ["", [Validators.required, Validators.min(0)]],
    url: ["", [Validators.required, Validators.minLength(3)]],
    color: ["", [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private paintService: PaintService,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getPaint();
  }

  getPaint(): void {
    this.route.params.subscribe((param: any) => {
      const id = param["id"];

      this.paintService.getPaint(id)
        .subscribe((paint: Paint) => this.paint = paint);
    }) 
  }

  savePaint(id: string): void {
    if (this.paint && this.paintForm.valid) {
      this.paintService.editPaint(id, this.paint)
        .subscribe((paint: Paint) => this.paint = paint);

      this.toastr.success(`Paint with id: ${this.paint?._id} updated`, "Paint updated",  {
        progressBar: true
      });

      this.router.navigate(["/paints"]);
    }
  }

  goBack(): void {
    this.location.back();
  }

  deletePaint(id: string): void {
    this.paintService.deletePaint(id);

    this.toastr.success(`Paint with id: ${id} deleted`, "Paint deleted",  {
      progressBar: true
    });

    this.router.navigate(["/paints"]);
  }

}
