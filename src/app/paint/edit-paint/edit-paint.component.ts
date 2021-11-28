import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private paintService: PaintService,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPaint();
  }

  getPaint(): void {
    this.route.params.subscribe((param) => {
      const id = Number(param["id"]);

      this.paintService.getPaint(id)
        .subscribe((paint) => this.paint = paint);
    }) 
  }

  goBack(): void {
    this.location.back();
  }

  deletePaint(id: number): void {
    this.paintService.deletePaint(id);

    this.toastr.success(`Paint with id: ${id} deleted`, "Paint deleted",  {
      progressBar: true
    });

    this.router.navigate(["/paints"]);
  }

}
