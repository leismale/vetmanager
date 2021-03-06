import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"]
})
export class CustomerComponent implements OnInit {
  constructor(private sessionService: SessionService, private router: Router) {}

  placeholderUser = "Username";
  placeholderPass = "Password";
  placeholderName = "Name";
  placeholderSurname = "Surname";
  placeholderEmail = "Email";
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  error: string;

  ngOnInit() {}

  changeSettings(
    usernameId = this.sessionService.user._id,
    password: string,
    name: string,
    surname: string,
    email: string
  ) {
    this.sessionService
      .changeSettings(usernameId, password, name, surname, email)
      .subscribe((user: any) => {
        this.router.navigate(["/"]);
      });
  }
}
