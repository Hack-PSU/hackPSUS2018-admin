import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule, MatExpansionModule,
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
  MatTabsModule, MatToolbarModule,
  MatTooltipModule,
    MatGridListModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    MatToolbarModule, MatCardModule, MatDialogModule, MatStepperModule, MatListModule, MatMenuModule, MatIconModule, MatSidenavModule,
    MatTabsModule, MatTableModule, MatFormFieldModule, MatButtonModule, MatInputModule, NoopAnimationsModule, MatPaginatorModule,
    MatTooltipModule, MatSelectModule, MatSortModule, MatCheckboxModule, MatExpansionModule, MatGridListModule,
  ],
  exports: [
    MatToolbarModule, MatCardModule, MatDialogModule, MatStepperModule, MatListModule, MatMenuModule, MatIconModule,
    MatSidenavModule, MatTabsModule, MatTableModule, MatFormFieldModule, MatButtonModule, MatInputModule, NoopAnimationsModule,
    MatPaginatorModule, MatTooltipModule, MatSelectModule, MatSortModule, MatCheckboxModule, MatExpansionModule, MatGridListModule,
  ],
})
export class CustomMaterialModule {
}
