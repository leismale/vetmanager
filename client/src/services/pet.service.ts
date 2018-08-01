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
export class PetService {
  options: object = { withCredentials: true };

  constructor(private http: Http) {}
  
  errorHandler(e) {
    console.log("Pet Service Error");
    console.log(e.message);
    console.log(e);
    return e;
  }

  getAllPets(){
    return this.http
    .get(`${BASEURL}/api/pets/getAllPets/`, this.options)
    .pipe(
      map((res: Response) => {
        return res.json();
      }),
      catchError(e => of(this.errorHandler(e)))
    ); 
  }

  newPet(info): Observable<object> {
    return this.http
      .post(`${BASEURL}/api/pets/newPet`, info, this.options)
      .pipe(
        map((res: Response) => {
            console.log(res)
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }





}
