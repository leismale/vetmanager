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
  graphData: any;
  data: any = [];
  weightData = [];

  constructor(
    public petService: PetService,
    public sessionService: SessionService
  ) {
    this.petService.getMyPets(this.sessionService.user).subscribe(pets => {
      this.pets = pets;
      this.graphData = this.pets.pets;
      console.log(pets);
      console.log(this.graphData);
      this.objToArr();
    });
  }

  ngOnInit() {}

  canvas: any;
  ctx: any;

  objToArr() {
    let data = this.graphData.forEach(e => {
      e.weight.forEach(e => {
        console.log(e)
        this.weightData.push(Object.values(e));

      })
    });

    this.canvas = document.getElementById("myChart");
    this.ctx = this.canvas.getContext("2d");
    let myChart = new Chart(this.ctx, {
      type: "pie",
      data: {
        labels: this.weightData[1],
        datasets: [
          {
            label: "kg",
            data: this.weightData[0],
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: false
      }
    });
    console.log(this.weightData);
  }

  ngAfterViewInit() {
   
  }
}
