import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations'
import { NotificationService } from '../notification.service';
import {tap, switchMap} from 'rxjs/operators'
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Hello There!'

  snackvisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier
    .pipe(tap(message => {
      this.message = message
      this.snackvisibility = 'visible'
    }),
    switchMap(message => timer(3000)))
    .subscribe(timer=> this.snackvisibility = 'hidden')
  }


}
