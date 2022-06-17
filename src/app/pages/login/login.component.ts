import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { authService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import { error } from "../../helpers/sweet.config";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginControl: FormGroup;
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private _auth: authService
  ) {
    const authState = this._auth.isAuthenticated;
    if (authState == true) {
      this.router.navigateByUrl("/dashboard");
    }
    this.loginControl = this.CreateFormGroup();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  login() {
    if (this.loginControl.valid) {
      this.spinner.show();
      this._auth.login(this.loginControl.value).subscribe({
        next: (e) => {
          this.spinner.hide();
          if (e.success) {
            this.router.navigateByUrl("/cuenta/info");
          } else {
            Swal.fire({
              title: e.message,
              ...error,
            });
          }
        },
        error: (err) => {
          this.spinner.hide();
          Swal.fire({
            ...error,
            title: err.message,
          });
        },
      });
    } else {
      this.loginControl.markAllAsTouched();
    }
  }

  CreateFormGroup() {
    return new FormGroup({
      correo: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  get correo() {
    return this.loginControl.get("correo");
  }
  get password() {
    return this.loginControl.get("password");
  }
}
