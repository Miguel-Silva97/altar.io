import { Injectable } from '@angular/core';
import { Result } from '../models/result.model';
import { Payment } from '../models/payment.model';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { PaymentsComponent } from 'src/app/payments/payments/payments.component';

const GRID_SIZE: number = 10;
const PERCENTAGE_CHOSEN_CHAR = 20;

@Injectable({
  providedIn: 'root',
})
export class GeneratorService {
  private gridMatrix: string[][];
  public chosenChar: string = '';
  private results: Result[] = [];
  public currentScore: number = 0;
  public currentGrid: string[][] = [];
  public stopGenerating: boolean;
  payments: Payment[] = [];

  constructor() {
    this.generateEmptyGrid();
  }

  generateWithTimer() {
    this.stopGenerating = false;
    interval(2000)
      .pipe(takeWhile(() => !this.stopGenerating))
      .subscribe(() => {
        this.generateGridMatrix();
      });
  }

  stopGenerateWithTimer() {
    this.stopGenerating = true;
  }

  generateEmptyGrid() {
    this.gridMatrix = [];
    /* Initialization of the bidimensional array with empty values */
    for (let i = 0; i < GRID_SIZE; i++) {
      this.gridMatrix[i] = [];
      for (let b = 0; b < GRID_SIZE; b++) {
        this.gridMatrix[i][b] = '';
      }
    }

    this.currentGrid = this.gridMatrix;
  }

  generateGridMatrix() {
    let char = this.chosenChar;
    this.generateEmptyGrid();

    /* Check if user sends a character and fills with the percentage, in this case it's 20% of the grid */
    if (char !== '') {
      let charAdded = 0;
      while (charAdded < PERCENTAGE_CHOSEN_CHAR) {
        let x = Math.floor(Math.random() * GRID_SIZE);
        let y = Math.floor(Math.random() * GRID_SIZE);

        if (this.gridMatrix[x][y] === '') {
          this.gridMatrix[x][y] = char;
          charAdded++;
        }
      }
    }

    /* Remove the selected char from the possible list, so the grid only have 20 appearances of the car*/
    let possibleValues: string[] = 'abcdefghijklmnopqrstuvwxyz'
      .replace(char, '')
      .split('');

    /* Fill the grid with random characters */
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        if (this.gridMatrix[x][y] === '') {
          let valueIndex = Math.floor(Math.random() * possibleValues.length);
          this.gridMatrix[x][y] = possibleValues[valueIndex];
        }
      }
    }

    let score = this.getScoreNumber();

    this.results.push({
      grid: this.gridMatrix,
      score: score,
    });

    this.currentScore = score;
    this.currentGrid = this.gridMatrix;

    return {
      grid: this.gridMatrix,
      code: score,
    };
  }

  getResults() {
    return this.results;
  }

  getScoreNumber() {
    let seconds = new Date().getSeconds().toString().split('');
    let countY = 0;
    let countX = 0;
    let finalCountX = 0;
    let finalCountY = 0;
    let secondX = +seconds[0];
    let secondY = 0;
    /* If seconds list has 2 positions, means the number is >= 10, so set the 2nd coordinate of seconds to the value*/
    if (seconds.length > 1) {
      secondY = +seconds[1];
    }

    /* Count the ocurrences of the seconds position 1 and 2*/
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        if (this.gridMatrix[x][y] === this.gridMatrix[secondX][secondY]) {
          countX++;
        }
        if (this.gridMatrix[x][y] === this.gridMatrix[secondY][secondX]) {
          countY++;
        }
      }
    }

    /* Check for the lowest possible divisor if the count is bigger than 9 */
    if (countX > 9) {
      let divider = 2;
      do {
        finalCountX = Math.ceil(countX / divider);
        divider++;
      } while (finalCountX > 9);
    } else {
      finalCountX = countX;
    }

    /* Check for the lowest possible divisor if the count is bigger than 9 */
    if (countY > 9) {
      let divider = 2;
      do {
        finalCountY = Math.ceil(countY / divider);
        divider++;
      } while (finalCountY > 9);
    } else {
      finalCountY = countY;
    }

    let scoreNumber: number = +('' + finalCountX + finalCountY);

    return scoreNumber;
  }

  addPayment(paymentName: string, ammount: number) {
    let payment: Payment = {
      name: paymentName,
      ammount: ammount,
      code: this.currentScore,
      grid: 100,
      gridCopy: this.currentGrid,
    };

    this.payments.push(payment);
  }

  getPayments() {
    return this.payments;
  }

  changeChosenChar(char: string) {
    this.chosenChar = char;
  }
}
