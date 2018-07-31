import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private sessionService:SessionService) { sessionService.isLogged().subscribe() }

  logout(){
    this.sessionService.logout().subscribe();
  }
}
