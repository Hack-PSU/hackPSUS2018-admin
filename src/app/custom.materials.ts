import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatSidenavModule, MatTableModule, MatTabsModule,
  MatTooltipModule, MatSelectModule, MatIconModule, MatSortModule, MatCheckboxModule, MatProgressBarModule,
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
  MatSidenavModule, MatSlideToggleModule,
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
    MatProgressBarModule, MatTabsModule, MatTableModule, MatFormFieldModule, MatButtonModule, MatInputModule, NoopAnimationsModule, MatPaginatorModule,
    MatTooltipModule, MatSelectModule, MatSortModule, MatCheckboxModule, MatExpansionModule, MatGridListModule,MatSlideToggleModule,
  ],
  exports: [
    MatToolbarModule, MatCardModule, MatDialogModule, MatStepperModule, MatListModule, MatMenuModule, MatIconModule,
    MatProgressBarModule,MatSidenavModule, MatTabsModule, MatTableModule, MatFormFieldModule, MatButtonModule, MatInputModule, NoopAnimationsModule,
    MatPaginatorModule, MatTooltipModule, MatSelectModule, MatSortModule, MatCheckboxModule, MatExpansionModule, MatGridListModule,MatSlideToggleModule
  ],
})
export class CustomMaterialModule {
}
