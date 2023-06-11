import { Component } from '@angular/core';
import { Subscriber } from '../../interfaces/list-all-subscribers.interface';
import { listAllSubsService } from '../../services/list-all-subs.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-sub',
  templateUrl: './detail-sub.component.html',
  styleUrls: ['./detail-sub.component.css'],
})
export class DetailSubComponent {
  subscribe: Subscriber = {
    Name: '',
    Email: '',
    CountryCode: '',
    PhoneNumber: 0,
    JobTitle: '',
    Area: '',
    Topics: [],
  };

  constructor(
    private listAllService: listAllSubsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.listAllService.detailSub(id).subscribe(
      (data) => {
        this.subscribe = data;
        console.log(this.subscribe);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
