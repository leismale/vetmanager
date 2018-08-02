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
export class StaffService {
  options: object = { withCredentials: true };

  constructor(private http: Http) {}

  errorHandler(e) {
    console.log("Appointment Service Error");
    console.log(e.message);
    console.log(e);
    return e;
  }

  getAllStaff() {
    return this.http
      .get(`${BASEURL}/api/staff/getAllStaff/`, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  getAppointments(date): Observable<object> {
    return this.http
      .post(
        `${BASEURL}/api/appointments/newAppointment`,
        { date },
        this.options
      )
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }


  getAllAppointments() {
    return this.http
      .get(`${BASEURL}/api/appointments/getAllAppointments/`, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }


  newStaff(username, password, name, surname, email): Observable<object> {
    console.log(username)
    return this.http
      .post(`${BASEURL}/api/staff/newstaff`, { username, password, name, surname, email }, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }
/* 
  pickAppointment(date, start, startTime, end): Observable<object> {
    console.log(startTime);
    return this.http
      .post(
        `${BASEURL}/api/appointments/bookAppointment`,
        { date, start, startTime, end },
        this.options
      )
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  getDetails(id) {
    return this.http
      .get(`${BASEURL}/api/appointments/getDetails/${id}`, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  updateAppointment(appointmentId, title, start, end){
    return this.http
      .post(`${BASEURL}/api/appointments/updateAppointment`, { appointmentId, title, start, end }, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  } */
}
