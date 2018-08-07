import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private sessionService: SessionService, private router: Router) {}

  username: string;
  password: string;
  message: string;

  ngOnInit() {}

  login(username: string, password: string) {
    this.sessionService.login(username, password).subscribe(user => {
      if (user["role"] == "admin") this.router.navigate(["admin"]);
      if (user["role"] == "customer") this.router.navigate([""]);
      if (user["role"] == "rec" || "vet") this.router.navigate(["reception"]);
    });
  }
}
