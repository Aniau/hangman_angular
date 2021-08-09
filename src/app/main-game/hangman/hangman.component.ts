import { Component, OnInit } from '@angular/core';
import { WordService } from '../../service/word.service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit {
  public hangShowLegLeft = false;
  public hangShowLegRight = false;
  public hangShowHandLeft= false;
  public hangShowHandRight = false;
  public hangShowBody = false;
  public hangShowHead = false;

  constructor(private wordSevice: WordService) { }

  ngOnInit() {
    this.wordSevice.getErrors().subscribe(
      (failed: number[]) => {
        switch(failed.length)
        {
          case 1:
          {
            this.hangShowHead = true;
            break;
          }
          case 2:
          {
            this.hangShowHead = true;
            this.hangShowBody = true;
            break;
          }
          case 3:
          {
            this.hangShowHead = true;
            this.hangShowBody = true;
            this.hangShowHandLeft = true;
            break;
          }
          case 4:
          {
            this.hangShowHead = true;
            this.hangShowBody = true;
            this.hangShowHandLeft = true;
            this.hangShowHandRight = true;
            break;
          }
          case 5:
          {
            this.hangShowHead = true;
            this.hangShowBody = true;
            this.hangShowHandLeft = true;
            this.hangShowHandRight = true;
            this.hangShowLegRight = true;
            break;
          }
          case 6:
          {
            this.hangShowHead = true;
            this.hangShowBody = true;
            this.hangShowHandLeft = true;
            this.hangShowHandRight = true;
            this.hangShowLegRight = true;
            this.hangShowLegLeft = true;
            break;
          }
          default : 
          {
            this.hangShowHead = false;
            this.hangShowBody = false;
            this.hangShowHandLeft = false;
            this.hangShowHandRight = false;
            this.hangShowLegRight = false;
            this.hangShowLegLeft = false;
          }
        }
      },
      error => {
        console.log(error);
      }
      );
  }
}

