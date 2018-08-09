import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StaffService } from "../../../services/staff.service";

@Component({
  selector: "app-newstaff",
  templateUrl: "./newstaff.component.html",
  styleUrls: ["./newstaff.component.scss"]
})
export class NewstaffComponent implements OnInit {
  constructor(private staffService: StaffService, private router: Router) {}

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

  newStaff(
    username: string,
    password: string,
    name: string,
    surname: string,
    email: string
  ) {
    this.staffService
      .newStaff(username, password, name, surname, email)
      .subscribe((user: any) => {
        this.router.navigate(["/"]);
      });
  }
}
