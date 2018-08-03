import { Component, OnInit } from "@angular/core";
import { PetService } from "../../services/pet.service";
import { SessionService } from "../../services/session.service";

@Component({
  selector: "app-mypets",
  templateUrl: "./mypets.component.html",
  styleUrls: ["./mypets.component.css"]
})
export class MypetsComponent implements OnInit {
  pets;
  constructor(
    public petService: PetService,
    private sessionService: SessionService
  ) {
    this.petService
      .getMyPets(this.sessionService.user)
      .subscribe(pets => {this.pets = pets; console.log(pets)});
  }

  ngOnInit() {}
}
