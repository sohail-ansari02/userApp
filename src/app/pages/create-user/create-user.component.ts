import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, JsonPipe],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent implements OnInit {
  fb = inject(FormBuilder);
  us = inject(UserService);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      job: ['', [Validators.required]],
    });

  }
  onSubmit() {
    console.log(this.form.value);
    this.us.createUser(this.form.value).subscribe(
      () => {
        alert('added!');
      },
      // error handeling
      (err) => {
        console.log('error!', err);
      },
      () => {
        console.log('completed process');
      }
    );
  }
}
