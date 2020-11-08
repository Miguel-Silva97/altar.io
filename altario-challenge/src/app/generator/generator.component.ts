import { Component, OnInit } from '@angular/core';
import { GeneratorService } from '../shared/services/generator.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'generator',
  templateUrl: './generator.html',
  styleUrls: ['./generator.scss'],
})
export class GeneratorComponent implements OnInit {
  character = new FormControl('', [
    Validators.required,
    Validators.pattern('^[A-z]{1}$'),
  ]);

  secondsPassed: number = 4;
  canChange: boolean = true;

  messageValidator: string = '';

  constructor(
    public generatorService: GeneratorService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  generateGrid() {
    this.generatorService.generateWithTimer();
    interval(1000)
      .pipe(takeWhile(() => !this.generatorService.stopGenerating))
      .subscribe(() => {
        let value: string = this.character.value;
        this.secondsPassed += 1;

        if (this.character.value !== this.generatorService.chosenChar) {
          if (this.secondsPassed >= 4) {
            if (!this.character.valid) {
              this.messageValidator = 'Only 1 alphabetic character!';
            } else {
              this.generatorService.changeChosenChar(value.toLowerCase());
              this.secondsPassed = 0;
              this.messageValidator = '';
              Swal.fire({
                text: 'Character chosen successfully!',
                icon: 'success',
                confirmButtonText: 'Ok',
                timer: 500,
              });
            }
          } else {
            this.messageValidator =
              'Can only change character every 4 seconds!';
          }
        }
      });
  }
}
