import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { authService } from "src/app/services/auth.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "fa-solid fa-desktop text-primary",
    class: "",
  },
  {
    path: "/icons",
    title: "Icons",
    icon: "fa-solid fa-earth-americas text-blue",
    class: "",
  },
  {
    path: "/maps",
    title: "Maps",
    icon: "fa-solid fa-location-pin text-orange",
    class: "",
  },
  {
    path: "/user-profile",
    title: "User profile",
    icon: "fa-solid fa-user text-yellow",
    class: "",
  },
  {
    path: "/tables",
    title: "Tables and select",
    icon: "fa-solid fa-table-list text-red",
    class: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private _auth: authService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  logout() {
    this._auth.logout();
  }
}
