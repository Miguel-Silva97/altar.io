import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GeneratorComponent } from './generator.component';

const routes: Routes = [
  {
    path: '',
    component: GeneratorComponent,
    data: {
      title: 'Generator',
    },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratorRoutingModule {}
