import { Component } from '@angular/core';
import { listAllSubsService } from '../../services/list-all-subs.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subs } from '../../interfaces/list-all-subscribers.interface';

@Component({
  selector: 'app-create-subscriber',
  templateUrl: './create-subscriber.component.html',
  styleUrls: ['./create-subscriber.component.css'],
})
export class CreateSubscriberComponent {
  constructor(
    private listAllSubsService: listAllSubsService,
    private fb: FormBuilder
  ) {}

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    countryCode: ['', [Validators.required, Validators.maxLength(2)]],
    phoneNumber: ['', [Validators.required]],
    jobTitle: ['', [Validators.required, Validators.minLength(4)]],
    area: ['', [Validators.required, Validators.minLength(3)]],
  });
  isNotValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';

        case 'minlength':
          return `Minimum ${errors['minlength'].requiredLength} caracters.`;

        case 'maxlength':
          return `Maximum ${errors['maxlength'].requiredLength} caracters.`;
      }
    }
    return null;
  }
  onCreate() {
    const { name, email, countryCode, phoneNumber, jobTitle, area } =
      this.myForm.value;
    const subscriberData: Subs = {
      Subscribers: [
        {
          name,
          email,
          countryCode,
          phoneNumber,
          jobTitle,
          area,
          topics: [],
        },
      ],
    };

    this.listAllSubsService.save(subscriberData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'subscriber created',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'failed to create',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
    this.myForm.reset({});
  }
}
