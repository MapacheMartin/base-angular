import { Component, OnInit } from "@angular/core";
import { userService } from "src/app/services/user.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  isLoading = true;
  user: any = {};
  constructor(private _user: userService) {}

  ngOnInit() {
    this.getUser();
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
}
