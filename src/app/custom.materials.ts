import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatSidenavModule, MatTableModule, MatTabsModule,
  MatTooltipModule, MatSelectModule, MatIconModule, MatSortModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [MatIconModule, MatSidenavModule, MatTabsModule, MatTableModule, MatFormFieldModule, MatButtonModule, MatInputModule, NoopAnimationsModule, MatPaginatorModule, MatTooltipModule, MatSelectModule, MatSortModule],
  exports: [MatIconModule, MatSidenavModule, MatTabsModule, MatTableModule, MatFormFieldModule, MatButtonModule, MatInputModule, NoopAnimationsModule, MatPaginatorModule, MatTooltipModule, MatSelectModule, MatSortModule],
})
export class CustomMaterialModule {
}