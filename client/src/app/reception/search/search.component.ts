import { Component, OnInit } from "@angular/core";
import { PetService } from "../../../services/pet.service";
import { CustomerService } from "../../../services/customer.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  items: object;
  customers: string;
  search: string;
  pets: object;

  constructor(
    private petService: PetService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {}

  getAllPets() {
    this.petService.getAllPets().subscribe(items => {
      this.items = items;
    });
  }
  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe(items => {
      this.items = items;
    });
  }
}
