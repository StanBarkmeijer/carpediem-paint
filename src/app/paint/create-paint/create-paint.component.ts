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
    this.paintService
      .createPaint(this.paintForm.value)
      .subscribe(() => {
        this.toastr.success("Paint created", "Success", {
          progressBar: true
        });
        
        this.router.navigate(["/paints"]);
      });
  }
  

}
