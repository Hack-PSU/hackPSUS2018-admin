import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    MatCardModule, MatDialogModule, MatStepperModule, MatListModule, MatMenuModule, MatIconModule, MatSidenavModule,
    MatTabsModule, MatTableModule, MatFormFieldModule, MatButtonModule, MatInputModule, NoopAnimationsModule, MatPaginatorModule,
    MatTooltipModule, MatSelectModule, MatSortModule, MatCheckboxModule,
  ],
  exports: [
    MatCardModule, MatDialogModule, MatStepperModule, MatListModule, MatMenuModule, MatIconModule,
    MatSidenavModule, MatTabsModule, MatTableModule, MatFormFieldModule, MatButtonModule, MatInputModule, NoopAnimationsModule,
    MatPaginatorModule, MatTooltipModule, MatSelectModule, MatSortModule, MatCheckboxModule,
  ],
})
export class CustomMaterialModule {
}
