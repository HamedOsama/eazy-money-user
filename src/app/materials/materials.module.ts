import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

const materials = [
  MatProgressBarModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatStepperModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatPaginatorModule,
  MatTableModule,
  MatDividerModule,
  MatTooltipModule,
  MatSortModule,
];

@NgModule({
  imports: [materials],
  exports: [materials],
})
export class MaterialsModule {}
