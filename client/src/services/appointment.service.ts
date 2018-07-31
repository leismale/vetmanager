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
export class AppointmentService {
  options: object = { withCredentials: true };

  constructor(private http: Http) {}
  
  errorHandler(e) {
    console.log("Appointment Service Error");
    console.log(e.message);
    console.log(e);
    return e;
  }

  sendDate(date): Observable<object> {
    return this.http
      .post(`${BASEURL}/api/appointments/newAppointment`, { date }, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }


  pickAppointment(appointment, date, timeStart, timeEnd): Observable<object> {
    return this.http
      .post(`${BASEURL}/api/appointments/bookAppointment`, { appointment, date, timeStart, timeEnd }, this.options)
      .pipe(
        map((res: Response) => {
            console.log(res)
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }





}
