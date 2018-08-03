import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  staff: object;
  search: string;
  
  constructor(public staffService: StaffService) {
    this.getAllStaff();
   }

  ngOnInit() {
  }

  getAllStaff() {
    this.staffService.getAllStaff().subscribe(staff => {
      this.staff = staff;
    });
  }

}
