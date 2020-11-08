import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit {
  hourStyle;
  minuteStyle;
  secondStyle;

  timerId: any;

  date: Date;
  hour: number = 0;
  minute: number = 0;
  second: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.timerId = this.getTime();
  }

  animateAnalogClock() {
    this.hourStyle = {
      transform: `translate3d(-50%, 0, 0) rotate(${
        this.hour * 30 + this.minute * 0.5 + this.second * (0.5 / 60)
      }deg)`,
    };

    this.minuteStyle = {
      transform: `translate3d(-50%, 0, 0) rotate(${
        this.minute * 6 + this.second * 0.1
      }deg)`,
    };

    this.secondStyle = {
      transform: `translate3d(-50%, 0, 0) rotate(${this.second * 6}deg)`,
    };
  }

  getTime() {
    return setInterval(() => {
      this.date = new Date();
      this.hour = this.date.getHours();
      this.minute = this.date.getMinutes();
      this.second = this.date.getSeconds();

      this.animateAnalogClock();
    }, 1000);
  }
}
