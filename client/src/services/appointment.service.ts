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

  getAllAppointments(state) {
    return this.http
      .post(`${BASEURL}/api/appointments/getAllAppointments/`, {state}, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  getMyAppointments(user) {
    return this.http
      .post(`${BASEURL}/api/appointments/getMyAppointments/`, user, this.options)
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

  pickAppointment(date, start, startTime, end): Observable<object> {
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

  updateAppointment(appointmentId, title, start, end) {
    return this.http
      .post(
        `${BASEURL}/api/appointments/updateAppointment`,
        { appointmentId, title, start, end },
        this.options
      )
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  closeAppointment(appointmentId, weight, content) {
    return this.http
      .post(
        `${BASEURL}/api/appointments/closeAppointment`,
        { appointmentId, weight, content },
        this.options
      )
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }
}
