import { Component, OnInit } from "@angular/core";
import { PetService } from "../../../services/pet.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-newpet",
  templateUrl: "./newpet.component.html",
  styleUrls: ["./newpet.component.css"]
})
export class NewpetComponent implements OnInit {
  constructor(public petService: PetService, public router: Router) {}
  newPetInfo: object;
  owner: string;
  name: string;
  species: string;
  color: string;
  weight: string;
  error: string;

  ngOnInit() {}

  newPet(
    owner: string,
    name: string,
    species: string,
    color: string,
    weight: string
  ) {
    this.newPetInfo = {
      owner,
      name,
      species,
      color,
      weight
    };
    this.petService.newPet(this.newPetInfo).subscribe((user: any) => {
      console.log(`WELCOME USER ${user.username}, register OK`);
      console.log(user);
      this.router.navigate(["/"]);
    });
  }
}
