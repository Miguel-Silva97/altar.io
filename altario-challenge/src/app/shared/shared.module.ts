import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from './score/score.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ClockComponent } from './clock/clock.component';

@NgModule({
  exports: [ScoreComponent, NavbarComponent, ClockComponent],
  declarations: [ScoreComponent, NavbarComponent, ClockComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatGridListModule,
    MatInputModule,
    MatToolbarModule,
    RouterModule,
  ],
})
export class SharedModule {}
