import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaintService } from '../paint.service';

@Component({
  selector: 'app-create-paint',
  templateUrl: './create-paint.component.html',
  styleUrls: ['./create-paint.component.css']
})
export class CreatePaintComponent implements OnInit {

  paintForm = this.fb.group({
    id: ((Math.random() * 100) + 1)|0,
    name: ["", Validators.required],
    price: ["", Validators.required],
    url: ["", Validators.required],
    color: ["", Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private paintService: PaintService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  sendForm(): void {
    this.paintService.createPaint(this.paintForm.value);

    this.toastr.success(`Created paint with ID: ${this.paintForm.value.id}`, "Added user", {
      progressBar: true
    });

    this.router.navigate(["/paints"]);
  }
  

}
