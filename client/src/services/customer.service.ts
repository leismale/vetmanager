import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from "../environments/environment";

import { map, catchError } from "rxjs/operators";
import { Observable } from "../../node_modules/rxjs";
import { of } from "rxjs";

const { BASEURL } = environment;

/* interface UserObject {
  username: string;
  role: string;
} */

@Injectable()
export class CustomerService {
  options: object = { withCredentials: true };

  constructor(private http: Http) {}

  errorHandler(e) {
    console.log("Pet Service Error");
    console.log(e.message);
    console.log(e);
    return e;
  }

  getAllCustomers() {
    return this.http
      .get(`${BASEURL}/api/customers/getAllCustomers/`, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  getCustomer(id) {
    return this.http
      .get(`${BASEURL}/api/customers/getCustomer/${id}`, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  updateCustomer(username, name, surname, email){
    return this.http
      .post(`${BASEURL}/api/customers/updateCustomer`, { username, name, surname, email }, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }
}
