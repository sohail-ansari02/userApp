import { Component, OnInit, inject } from '@angular/core';
import { UsersCardComponent } from '../../components/users-card/users-card.component';
import { UserService } from '../../services/user.service';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UsersCardComponent,
    JsonPipe,
    TitleCasePipe,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  fb = inject(FormBuilder);
  us = inject(UserService);
  users: any[] = [];
  selectedUser: any = undefined;
  updateForm!: FormGroup;

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      name: ['', [Validators.required]],
      job: ['', [Validators.required]],
    });
    this.getUsers();
  }
  getUsers() {
    this.us.getUsers().subscribe((res: any) => (this.users = res.data));
  }

  getInfo(id: any) {
    this.us.getSingleUser(id).subscribe((res: any) => {
      this.selectedUser = res.data;

      let data = {
        name: this.selectedUser.first_name + ' ' + this.selectedUser.last_name,
        job: this.selectedUser.email.split('@')[1],
      };
      this.updateForm.setValue(data);
      // this.updateForm.patchValue(this.selectedUser);
    });
  }

  onUpdate() {
    this.us.updateUser(this.selectedUser.id, this.updateForm.value).subscribe({
      next: () => {
        this.getUsers();
      },
      error: () => alert('err'),
    });
  }
}
