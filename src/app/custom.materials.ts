import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatSidenavModule, MatTableModule, MatTabsModule,
  MatTooltipModule, MatSelectModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [MatSidenavModule, MatTabsModule, MatTableModule, MatFormFieldModule, MatButtonModule, MatInputModule, NoopAnimationsModule, MatPaginatorModule, MatTooltipModule, MatSelectModule],
  exports: [MatSidenavModule, MatTabsModule, MatTableModule, MatFormFieldModule, MatButtonModule, MatInputModule, NoopAnimationsModule, MatPaginatorModule, MatTooltipModule, MatSelectModule],
})
export class CustomMaterialModule {
}