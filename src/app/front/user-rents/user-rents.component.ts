import { Component, OnInit } from "@angular/core";
import { Rent } from "src/app/Models/Rent";
import { User } from "src/app/Models/User";
import { RentService } from "../Shared/rent.service";

@Component({
  selector: "app-user-rents",
  templateUrl: "./user-rents.component.html",
  styleUrls: ["./user-rents.component.css"],
})
export class UserRentsComponent implements OnInit {
  userRentsList: Rent[] = [];
  LoggedInuser: User;

  constructor(private _rentService: RentService) {}

  ngOnInit(): void {
    this.LoggedInuser = JSON.parse(localStorage.getItem("User"));
    this._rentService.getAllRents().subscribe((result) => {
      result.forEach((rent) => {
        console.log(rent);

        if (
          this.LoggedInuser[0] != null &&
          rent.user.id == this.LoggedInuser[0].id
        ) {
          this.userRentsList.push(rent);
        }
      });
    });
  }
}
