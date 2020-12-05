import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    /* this.formGroup = new FormGroup({
      username : new FormControl("",[Validators.required,Validators.maxLength(20)]),
      email : new FormControl("",[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$") ]),
      password : new FormControl("",[Validators.required,Validators.maxLength(40)]),
      cpassword : new FormControl("",[Validators.required,Validators.maxLength(40)]),
      
    });*/
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

  /*get username() {
    return this.formGroup.get("username");
  }
  get password() {
    return this.formGroup.get("password");
  }
  get email() {
    return this.formGroup.get("email");
  }
  get cpassword() {
    return this.formGroup.get("cpassword");
  }*/

  get f() {
    return this.formGroup.controls;
  }

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
}
