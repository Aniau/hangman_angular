import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(private router: Router,  public dialog: MatDialog) { }

  runNewGame() {
    this.router.navigate(['']);
    this.dialog.closeAll();
  }
}
