import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paint } from '../paint';
import { PaintService } from '../paint.service';

@Component({
  selector: 'app-paints',
  templateUrl: './paints.component.html',
  styleUrls: ['./paints.component.css']
})
export class PaintsComponent implements OnInit {

  paints: Paint[] = [];

  constructor(
    private paintService: PaintService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(() => this.getPaints());
  }

  getPaints(): void {
    this.paintService.getPaints()
      .subscribe((paints) => this.paints = paints);
  }
}
