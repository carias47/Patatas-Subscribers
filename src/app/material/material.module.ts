import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  exports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatMenuModule,
  ],
})
export class MaterialModule {}
