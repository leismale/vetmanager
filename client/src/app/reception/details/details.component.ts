import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CustomerService } from "../../../services/customer.service";
import { PetService } from "../../../services/pet.service";
import { SessionService } from "../../../services/session.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit {
  item: any;
  itemId: Object;
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private petService: PetService,
    public sessionService: SessionService
  ) {
    this.getDetails();
  }

  ngOnInit() {}

  getDetails() {
    this.route.params.subscribe(params => (this.itemId = params["id"]));
    this.customerService.getCustomer(this.itemId).subscribe(customer => {
      if (!customer) {
        this.petService.getPet(this.itemId).subscribe(pet => {
          this.item = pet;
          console.log(this.item);
        });
      } else {
        this.item = customer;
        console.log(this.item);
      }
    });
  }
}
