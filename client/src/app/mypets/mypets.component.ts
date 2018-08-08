import { Component, OnInit, AfterViewInit } from "@angular/core";
import { PetService } from "../../services/pet.service";
import { SessionService } from "../../services/session.service";
import { Chart, ChartData, Point } from "chart.js";

@Component({
  selector: "app-mypets",
  templateUrl: "./mypets.component.html",
  styleUrls: ["./mypets.component.css"]
})
export class MypetsComponent implements OnInit {
  pets: any;

  constructor(
    public petService: PetService,
    public sessionService: SessionService
  ) {}

  ngOnInit() {
    this.petService.getMyPets(this.sessionService.user).subscribe(pets => {
      this.pets = pets;
    });
  }

  ngAfterViewInit() {}
}
