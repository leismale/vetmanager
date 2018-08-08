import { Component, OnInit } from "@angular/core";
import { StaffService } from "../../../services/staff.service";
import { Http } from "@angular/http";

@Component({
  selector: "app-staffcalendar",
  templateUrl: "./staffcalendar.component.html",
  styleUrls: ["./staffcalendar.component.css"]
})
export class StaffcalendarComponent implements OnInit {
  items;
  itemsEvents;
  newItem;

  calendarOptions = {
    height: 800,
    header: {
      left: "prev,next today",
      center: "title",
      right: "month,listYear"
    },

    displayEventTime: false,
    events: []
  };

  constructor(public staffService: StaffService, public http: Http) {}

  onCalendarInit(initialized: boolean) {
    console.log(this.calendarOptions);
    console.log("Calendar initialized");
  }

  ngOnInit() {
    this.items = this.http //Call to Google calendar API, modify the response to get a compatible object with fullcalendar
      .get(
        "https://www.googleapis.com/calendar/v3/calendars/mt1t5hndp1j78vo7s174sqtsqs@group.calendar.google.com/events?callback=events&key=AIzaSyCZGB3FBTqHkpC8VvfFTwlmoWiUcvxN5rE&timeMin=2018-01-01T00%3A00%3A00Z&timeMax=2018-12-31T00%3A00%3A00Z&singleEvents=true&maxResults=9999"
      )
      .subscribe(res => {
        this.items = res["_body"].replace(/items/i, "events");
        this.itemsEvents = JSON.parse(
          this.items.slice(23, this.items.length - 2)
        );

        this.itemsEvents.events.forEach(e => {
          this.newItem = {
            title: e.summary,
            start: e.start.date,
            end: e.end.date
          };
          this.calendarOptions["events"].push(this.newItem);
        });
      });
  }
}
