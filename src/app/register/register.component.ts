import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { User } from "../Models/User";
import { NotificationService } from "../Shared/notification.service";
import { UserService } from "./../Shared/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  user: User;
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        username: ["", [Validators.required, Validators.maxLength(20)]],
        email: [
          "",
          [
            Validators.required,
            Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
          ],
        ],
        password: ["", [Validators.required, Validators.maxLength(40)]],
        confirmPassword: ["", [Validators.required, Validators.maxLength(40)]],
      },
      {
        validator: this.MustMatch("password", "confirmPassword"),
      }
    );
  }

  get f() {
    return this.formGroup.controls;
  }

  register = () => {
    this.user = this.formGroup.value;
    this._userService.register(this.user).subscribe(
      () => {
        this.showToasterSuccess("User Registred Successfully", "Success");
        this.formGroup.reset();
      },
      (error) => {
        this.showToasterError("Something went wrong", "Fail");
      }
    );
  };

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  showToasterSuccess(message: string, title: string) {
    this._notifService.showSuccess(message, title);
  }

  showToasterError(message: string, title: string) {
    this._notifService.showError(message, title);
  }
}
