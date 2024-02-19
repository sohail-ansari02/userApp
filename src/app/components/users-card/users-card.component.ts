import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-users-card',
  standalone: true,
  imports: [],
  templateUrl: './users-card.component.html',
  styleUrl: './users-card.component.scss'
})
export class UsersCardComponent {
  @Input() user: any; // Assuming 'user' is the input property containing user data


}
