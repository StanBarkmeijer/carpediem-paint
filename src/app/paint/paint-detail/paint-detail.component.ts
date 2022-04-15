import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Paint } from '../paint';
import { PaintService } from '../paint.service';

@Component({
  selector: 'app-paint-detail',
  templateUrl: './paint-detail.component.html',
  styleUrls: ['./paint-detail.component.css']
})
export class PaintDetailComponent implements OnInit, OnDestroy {

  @Input() paint!: Paint;
  authenticated: boolean = false;

  routeSubscription!: Subscription;
  authServiceSubscription!: Subscription;
  getPaintSubscription!: Subscription;
  deletePaintSubscription!: Subscription;

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

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.authServiceSubscription.unsubscribe();
    this.getPaintSubscription.unsubscribe();
    this.deletePaintSubscription.unsubscribe();
  }
  
  getMe(): void {
    this.authServiceSubscription = this.authService.getUser()
      .subscribe((me: any) => this.authenticated = me.roles.includes("admin"));
  }

  getPaint(): void {
    this.routeSubscription = this.route.params.subscribe((param: any) => {
      const id = param["id"];

      this.getPaintSubscription = this.paintService.getPaint(id)
        .subscribe((paint: Paint) => this.paint = paint);
    });
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

        this.router.navigate(["/paints"]);
      });
  }

}
