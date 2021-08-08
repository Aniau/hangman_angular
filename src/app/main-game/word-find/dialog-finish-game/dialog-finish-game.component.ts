import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-finish-game',
  templateUrl: './dialog-finish-game.component.html',
  styleUrls: ['./dialog-finish-game.component.css']
})
export class DialogFinishGameComponent implements OnInit {
  public winGameAudio = new Audio('https://www.pacdv.com/sounds/applause-sound/app-7.mp3');

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.winGameAudio.play();
  }

  runNewGame()
  {
    this.router.navigate(['']);
  }
}
