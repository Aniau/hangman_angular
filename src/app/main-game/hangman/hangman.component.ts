import { Component, OnInit } from '@angular/core';
import { WordService } from '../../service/word.service';
import {Store} from "@ngrx/store";
import {getErrorCounterSelector} from "../../store/selectors";

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

  constructor(private wordSevice: WordService,
              private readonly store: Store) { }

  ngOnInit() {
    this.store.select(getErrorCounterSelector).subscribe(
      errorCounter => {
        this.hangmanPartsShow(errorCounter);
      }
    );
  }

  private hangmanPartsShow(errorCount: number): void {
    switch(errorCount)
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
  }
}

