import { Component } from '@angular/core';
import { Subscriber } from '../../interfaces/list-all-subscribers.interface';
import { listAllSubsService } from '../../services/list-all-subs.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-subscribe',
  templateUrl: './edit-subscribe.component.html',
  styleUrls: ['./edit-subscribe.component.css'],
})
export class EditSubscribeComponent {
  subscribe!: Subscriber;

  constructor(
    private listAllService: listAllSubsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  get currentSub(): Subscriber {
    const sub = this.myForm.value as Subscriber;
    return sub;
  }

  public myForm: FormGroup = this.fb.group({
    Name: ['', [Validators.required, Validators.minLength(4)]],
    Email: ['', [Validators.required, Validators.email]],
    CountryCode: [
      '',
      [
        Validators.required,
        Validators.maxLength(2),
        Validators.pattern(/^[A-Z]{2}$/),
      ],
    ],
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

        case 'pattern':
          return `this field must be capitalized`;
      }
    }
    return null;
  }
  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.params
      .pipe(switchMap(() => this.listAllService.detailSub(id)))
      .subscribe((sub) => {
        if (!sub) {
          return this.router.navigate(['/']);
        }
        this.myForm.reset(sub);
        return;
      });
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    this.listAllService.update(id, this.currentSub).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'subscriber updated',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/']);
    });
    return;
  }
}
