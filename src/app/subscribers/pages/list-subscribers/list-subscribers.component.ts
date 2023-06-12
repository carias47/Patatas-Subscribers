import { Component, ViewChild } from '@angular/core';
import { ListAllSubscribers } from '../../interfaces/list-all-subscribers.interface';
import { listAllSubsService } from '../../services/list-all-subs.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-subscribers',
  templateUrl: './list-subscribers.component.html',
  styleUrls: ['./list-subscribers.component.css'],
})
export class ListSubscribersComponent {
  public listAllSubscribers: any[] = [];
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'country',
    'actions',
  ];
  dataSource!: MatTableDataSource<ListAllSubscribers>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private listAllSubsService: listAllSubsService) {}

  ngOnInit(): void {
    this.loadSubscribers();
  }

  loadSubscribers(): void {
    this.listAllSubsService.listAllSubs().subscribe((data) => {
      this.listAllSubscribers = Object.values(data);
      this.dataSource = new MatTableDataSource<ListAllSubscribers>(
        this.listAllSubscribers[1]
      );
      this.dataSource.paginator = this.paginator;
    });
  }
  deleteSubs(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you wont be able to get it back',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Nop, keep it',
    }).then((res) => {
      if (res.value) {
        this.listAllSubsService.delete(id).subscribe(() => {
          this.loadSubscribers();
        });
        Swal.fire('Deleted!', 'Subscriber deleted.', 'success');
      } else if (res.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancel', 'safe subscriber :)', 'error');
      }
    });
  }
}
