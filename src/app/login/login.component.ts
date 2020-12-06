import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../Models/User";
import { NotificationService } from "../Shared/notification.service";
import { UserService } from "../Shared/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  isUserLoggedIn: boolean = false;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _notifService: NotificationService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem("User") != null)
      this._router.navigate(["/movies"]);

    this.formGroup = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  get username() {
    return this.formGroup.get("username");
  }
  get password() {
    return this.formGroup.get("password");
  }

  loginUser = () => {
    this._userService.login(this.username.value).subscribe(
      (result) => {
        if (result[0].password == this.password.value) {
          localStorage.setItem("User", JSON.stringify(result));
          this._router.navigate(["/movies"]);
        } else if (!result) {
          localStorage.clear();
          this._notifService.showError(
            "Something Went Wrong",
            "Failed To Connect"
          );
          return;
        } else {
          this._notifService.showError(
            "Password is incorrect",
            "Failed To Connect"
          );
        }
      },
      (error) => {
        localStorage.clear();
        this._notifService.showError(
          "Something Went Wrong",
          "Failed To Connect"
        );
      }
    );
  };
}
