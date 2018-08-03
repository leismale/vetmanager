import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {

  appointments: string;
  search: string;
  picker: string;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.appointmentService.getAllAppointments().subscribe(appointments => this.appointments = appointments);
  }

}
