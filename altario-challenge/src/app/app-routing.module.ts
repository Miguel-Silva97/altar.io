import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'generator',
    loadChildren: () =>
      import('./generator/generator.module').then((mod) => mod.GeneratorModule),
  },
  {
    path: 'payments',
    loadChildren: () =>
      import('./payments/payments.module').then((mod) => mod.PaymentsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
