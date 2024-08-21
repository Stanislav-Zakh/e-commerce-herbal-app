import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-redirect',
  standalone: true,
  imports: [],
  templateUrl: './admin-redirect.component.html',
  styleUrl: './admin-redirect.component.css'
})
export class AdminRedirectComponent {


  ngOnInit(): void {
    window.location.href = "https://localhost:8443/control/admin";
  }

}
