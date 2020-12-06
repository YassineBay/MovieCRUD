import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../Models/User";

@Injectable({
  providedIn: "root",
})
export class UserService {
  url = "http://localhost:3000/Users";
  constructor(private _http: HttpClient) {}

  register = (user: User): Observable<User> => {
    return this._http.post<User>(this.url, user);
  };

  login = (email: string): Observable<User> => {
    return this._http.get<User>(`${this.url}?email=${email}`);
  };

  logout = () => {
    //localStorage.removeItem("User");
    localStorage.clear();
  };
}
