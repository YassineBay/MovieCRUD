import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Rent } from "src/app/Models/Rent";
import { User } from "src/app/Models/User";

@Injectable({
  providedIn: "root",
})
export class RentService {
  url = "http://localhost:3000/Rents";

  constructor(private _http: HttpClient) {}

  addRent = (rent: Rent): Observable<Rent> => {
    return this._http.post<Rent>(this.url + "/", rent);
  };

  getAllRents = (): Observable<Rent[]> => {
    return this._http.get<Rent[]>(this.url);
  };
}
