import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { Router } from "@angular/router";
import { authService } from "src/app/services/auth.service";
import { userService } from "src/app/services/user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public focus;
  user: any = {};
  isLoading = true;
  public listTitles: any[];
  public location: Location;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private _auth: authService,
    private _user: userService
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.getUser();
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

  getUser() {
    this.isLoading = true;
    this._user.get().subscribe({
      next: (e) => {
        if (e.success) {
          this.user = e.data;
        }
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  logout() {
    this._auth.logout();
  }
}
