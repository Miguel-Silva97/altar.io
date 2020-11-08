import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentsComponent,
    data: {
      title: 'Payments',
    },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsRoutingModule {}
