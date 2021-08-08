import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public looseGameAudio = new Audio('http://www.maths.mic.ul.ie/posullivan/boooo.wav');

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.looseGameAudio.play();
  }
  
  runNewGame()
  {
    this.router.navigate(['']);
  }
}
