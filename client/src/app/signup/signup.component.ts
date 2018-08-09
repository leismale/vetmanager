import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { Router } from "../../../node_modules/@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent{

  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  error: string;

  constructor(private sessionService: SessionService, private router: Router) {}

  signup(
    username: string,
    password: string,
    name: string,
    surname: string,
    email: string
  ) {
    this.sessionService
      .signup(username, password, name, surname, email)
      .subscribe((user: any) => {
        this.router.navigate(["/"]);
      });
  }
}
