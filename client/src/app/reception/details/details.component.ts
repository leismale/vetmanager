import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerService } from "../../../services/customer.service";
import { PetService } from "../../../services/pet.service";
import { SessionService } from "../../../services/session.service";
import { StaffService } from "../../../services/staff.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  item: any;
  itemId: Object;
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private petService: PetService,
    public sessionService: SessionService,
    private router: Router,
    private staffService: StaffService
  ) {
    this.getDetails();
  }

  ngOnInit() {}

  getDetails() {
    this.route.params.subscribe(params => (this.itemId = params["id"]));
    this.customerService.getCustomer(this.itemId).subscribe(customer => {
      if (!customer) {
        this.petService.getPet(this.itemId).subscribe(pet => {
          if (!pet) {
            this.staffService.getStaff(this.itemId).subscribe(staff => {
              this.item = staff;
            });
          } else {
            this.item = pet;
          }
        });
      } else {
        this.item = customer;
      }
    });
  }

  updateCustomer(username, name, surname, email) {
    this.customerService
      .updateCustomer(username, name, surname, email)
      .subscribe(() => {
        this.router.navigate(["reception"]);
      });
  }

  updateStaff(username, name, surname, email) {
    this.staffService
      .updateStaff(username, name, surname, email)
      .subscribe(() => {
        this.router.navigate(["admin"]);
      });
  }

  updatePet(name, species, color, weight) {
    this.petService.updatePet(name, species, color, weight).subscribe(() => {
      this.router.navigate(["reception"]);
    });
  }
}
