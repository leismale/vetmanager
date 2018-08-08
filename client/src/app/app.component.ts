import { Component } from "@angular/core";
import { SessionService } from "../services/session.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  user;
  constructor(public sessionService: SessionService) {
    sessionService.isLogged().subscribe(user => {console.log(user); console.log(sessionService.user);});
    console.log("entra")
  }

  logout() {
    this.sessionService.logout().subscribe();
  }
}
