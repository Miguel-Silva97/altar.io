import { NgModule } from '@angular/core';
import { GeneratorComponent } from './generator.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { GeneratorRoutingModule } from './generator-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GridComponent } from './grid/grid.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GeneratorComponent, GridComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    SharedModule,
    GeneratorRoutingModule,
    MatGridListModule,
    TextFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
})
export class GeneratorModule {}
