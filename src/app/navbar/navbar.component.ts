import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../Models/User";
import { UserService } from "../Shared/user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  hideMe: Boolean;
  userLoggedIn: User;
  constructor(private _router: Router, private _userService: UserService) {}

  ngOnInit(): void {
    this.userLoggedIn = JSON.parse(localStorage.getItem("User"));
  }

  logout = () => {
    this._userService.logout();
    this._router.navigate(["/login"]);
  };
}
