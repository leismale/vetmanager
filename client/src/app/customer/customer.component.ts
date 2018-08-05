import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"]
})
export class CustomerComponent implements OnInit {
  constructor(private sessionService: SessionService, private router: Router) {}

  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  error: string;

  ngOnInit() {}

  changeSettings(
    usernameId =  this.sessionService.user._id,
    password: string,
    name: string,
    surname: string,
    email: string
  ) {
    this.sessionService
      .changeSettings(usernameId, password, name, surname, email)
      .subscribe((user: any) => {
        console.log(user);
        this.router.navigate(["/"]);
      });
  }
}
