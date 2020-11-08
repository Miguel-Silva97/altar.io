import { Component, OnInit, Input } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  @Input() score: number;
  faCircle = faCircle;
  constructor() {}

  ngOnInit(): void {}
}
