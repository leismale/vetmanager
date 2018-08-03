import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from "../../../services/session.service";
import { AppointmentService } from "../../../services/appointment.service";

@Component({
  selector: "app-appointmentdetails",
  templateUrl: "./appointmentdetails.component.html",
  styleUrls: ["./appointmentdetails.component.css"]
})
export class AppointmentdetailsComponent implements OnInit {
  itemId: string;
  item: string;
  picker: string;
  search: string;

  constructor(
    private route: ActivatedRoute,
    public sessionService: SessionService,
    public appointmentService: AppointmentService,
    private router: Router
  ) {
    this.getDetails();
  }

  ngOnInit() {}

  getDetails() {
    this.route.params.subscribe(params => (this.itemId = params["id"]));
    this.appointmentService.getDetails(this.itemId).subscribe(appointment => {
      this.item = appointment;
      console.log(this.item);
    });
  }

  updateAppointment(title, start, end) {
    this.appointmentService
      .updateAppointment(this.itemId, title, start, end)
      .subscribe(() => {
        this.router.navigate(["admin"]);
      });
  }

  closeAppointment(weight, content) {
    this.appointmentService
      .closeAppointment(this.itemId, weight, content)
      .subscribe(() => {
        this.router.navigate(["vet"]);
      });
  }
}
