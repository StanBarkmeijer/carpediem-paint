import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PaintService } from '../paint.service';

@Component({
  selector: 'app-create-paint',
  templateUrl: './create-paint.component.html',
  styleUrls: ['./create-paint.component.css']
})
export class CreatePaintComponent implements OnInit, OnDestroy {

  createPaintSubscription!: Subscription;

  paintForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    price: ["", [Validators.required, Validators.min(0)]],
    url: ["", [Validators.required, Validators.minLength(3)]],
    color: ["", [Validators.required, Validators.minLength(3)]],
    amount: ["", [Validators.required, Validators.min(0)]]
  });

  constructor(
    private fb: FormBuilder,
    private paintService: PaintService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.createPaintSubscription?.unsubscribe();
  }

  sendForm(): void {
    if (this.paintForm.invalid) return;

    this.createPaintSubscription = this.paintService
      .createPaint(this.paintForm.value)
      .subscribe(() => {
        this.toastr.success("Paint created", "Success", {
          progressBar: true
        });
        
        this.router.navigate(["/paint"]);
      });
  }
  

}
