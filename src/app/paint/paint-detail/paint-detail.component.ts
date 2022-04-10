import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { Paint } from '../paint';
import { PaintService } from '../paint.service';

@Component({
  selector: 'app-paint-detail',
  templateUrl: './paint-detail.component.html',
  styleUrls: ['./paint-detail.component.css']
})
export class PaintDetailComponent implements OnInit {

  @Input() paint!: Paint;
  authenticated: boolean = false;

  constructor(
    private paintService: PaintService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPaint();
    this.getMe();
  }
  
  getMe(): void {
    this.authService.getUser()
      .subscribe((me: any) => this.authenticated = me.roles.includes("admin"));
  }

  getPaint(): void {
    this.route.params.subscribe((param: any) => {
      const id = param["id"];

      console.log(id);

      this.paintService.getPaint(id)
        .subscribe((paint: Paint) => this.paint = paint);
    });
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
