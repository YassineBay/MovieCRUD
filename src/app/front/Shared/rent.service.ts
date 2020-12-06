import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Rent } from "src/app/Models/Rent";

@Injectable({
  providedIn: "root",
})
export class RentService {
  url = "http://localhost:3000/Rents/";

  constructor(private _http: HttpClient) {}

  addRent = (rent: Rent): Observable<Rent> => {
    return this._http.post<Rent>(this.url, rent);
  };
}
