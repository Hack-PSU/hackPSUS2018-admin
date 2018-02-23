import { NgModule} from '@angular/core';
import { MatTableModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [MatTableModule, MatFormFieldModule, MatButtonModule, MatInputModule, NoopAnimationsModule, MatPaginatorModule],
  exports: [MatTableModule, MatFormFieldModule, MatButtonModule, MatInputModule, NoopAnimationsModule, MatPaginatorModule]
})
export class CustomMaterialModule { }