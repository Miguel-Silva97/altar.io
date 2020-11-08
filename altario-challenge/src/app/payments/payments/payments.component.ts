import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, Validators, PatternValidator } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GeneratorService } from 'src/app/shared/services/generator.service';
import { Payment } from 'src/app/shared/models/payment.model';
import Swal from 'sweetalert2';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'ammount', 'code', 'grid'];
  payment = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_]+.*$'),
  ]);
  ammount = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.pattern('^[0-9]*[1-9][0-9]*$'),
  ]);
  ammountValid: boolean = true;

  public listOfPayments: MatTableDataSource<Payment> = new MatTableDataSource();

  constructor(
    public generatorService: GeneratorService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.listOfPayments.data = this.generatorService.getPayments();
  }

  addPayment() {
    if (this.ammount.invalid || this.payment.invalid) {
      Swal.fire({
        text: 'Fill both fields correctly!',
        icon: 'error',
        confirmButtonText: 'Ok',
        timer: 1000,
      });
    } else if (this.generatorService.currentScore == 0) {
      Swal.fire({
        text: 'A grid must have been generated before!',
        icon: 'error',
        confirmButtonText: 'Ok',
        timer: 1000,
      });
    } else {
      Swal.fire({
        text: 'Payment added successfully!',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 1000,
      });

      this.generatorService.addPayment(this.payment.value, this.ammount.value);
      this.listOfPayments.data = this.generatorService.getPayments();
    }
  }
}
