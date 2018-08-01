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
  newPetInfo;
  ngOnInit() {}

  newPet(
    username: string,
    password: string,
    name: string,
    surname: string,
    email: string,
    petName: string,
    species: string,
    color: string,
    weight: string
  ) {
    this.newPetInfo = {
      username,
      password,
      name,
      surname,
      email,
      petName,
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
