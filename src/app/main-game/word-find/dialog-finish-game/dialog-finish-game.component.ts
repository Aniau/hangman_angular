import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-finish-game',
  templateUrl: './dialog-finish-game.component.html',
  styleUrls: ['./dialog-finish-game.component.css']
})
export class DialogFinishGameComponent {
  constructor(private router: Router, public dialog: MatDialog) { }

  runNewGame() {
    this.router.navigate(['']);
    this.dialog.closeAll();
  }
}
