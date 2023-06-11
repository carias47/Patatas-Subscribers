import { Component } from '@angular/core';
import { Subscriber } from '../../interfaces/list-all-subscribers.interface';
import { listAllSubsService } from '../../services/list-all-subs.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-subscribe',
  templateUrl: './edit-subscribe.component.html',
  styleUrls: ['./edit-subscribe.component.css'],
})
export class EditSubscribeComponent {
  subscribe: Subscriber = {
    Name: '',
    Email: '',
    CountryCode: '',
    PhoneNumber: 0,
    JobTitle: '',
    Area: '',
  };

  constructor(
    private listAllService: listAllSubsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}
  public myForm: FormGroup = this.fb.group({
    Name: ['', [Validators.required, Validators.minLength(4)]],
    Email: ['', [Validators.required, Validators.email]],
    CountryCode: ['', [Validators.required, Validators.maxLength(2)]],
    PhoneNumber: ['', [Validators.required]],
    JobTitle: ['', [Validators.required, Validators.minLength(4)]],
    Area: ['', [Validators.required, Validators.minLength(3)]],
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
  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.listAllService.detailSub(id).subscribe(
      (data) => {
        this.subscribe = data;
        this.myForm.patchValue({
          Name: this.subscribe.Name,
          Email: this.subscribe.Email,
          CountryCode: this.subscribe.CountryCode,
          PhoneNumber: this.subscribe.PhoneNumber,
          JobTitle: this.subscribe.JobTitle,
          Area: this.subscribe.Area,
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'failed to update',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/']);
      }
    );
  }

  onUpdate(): void {
    if (this.myForm.invalid) return;

    const id = this.activatedRoute.snapshot.params['id'];
    const { Name, Email, CountryCode, PhoneNumber, JobTitle, Area } =
      this.myForm.value;
    const subscriberData = {
      Name,
      Email,
      CountryCode,
      PhoneNumber,
      JobTitle,
      Area,
    };
    this.listAllService.update(id, subscriberData).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'subscriber updated',
          showConfirmButton: false,
          timer: 1500,
        });

        this.router.navigate(['/']);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'failed to update',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
}
