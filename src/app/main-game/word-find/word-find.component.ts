import { Component, OnInit } from '@angular/core';
import { ApiConnectService } from '../../service/api-connect.service';
import { MatDialog } from '@angular/material/dialog';
import { WordService } from '../../service/word.service';
import { DialogComponent } from '../word-find/dialog/dialog.component';
import { DialogFinishGameComponent } from './dialog-finish-game/dialog-finish-game.component';
import { Router } from '@angular/router';
import { ShowModel } from 'src/app/model/ShowModel';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getErrorCounterSelector,
  getRoundSelector,
  getScoreSelector,
  getUserSelector
} from 'src/app/store/selectors';
import { take } from "rxjs/operators";
import {
  ResetErrorCount,
  ResetScore,
  UpdateErrorCount,
  UpdateNewWord,
  UpdateRound,
  UpdateScore
} from "../../store/actions";

export interface DialogData {
  score: number;
  login: string;
}

@Component({
  selector: 'app-word-find',
  templateUrl: './word-find.component.html',
  styleUrls: ['./word-find.component.css']
})
export class WordFindComponent implements OnInit {
  user$: Observable<string> = this.store.select(getUserSelector);
  score$: Observable<number> = this.store.select(getScoreSelector);
  errorCounter$: Observable<number> = this.store.select(getErrorCounterSelector);
  roundNumber$: Observable<number> = this.store.select(getRoundSelector);
  private minValue: number = 1;
  private maxValue: number = 30;
  private wordId = 0;
  private roundWord: Array<number> = [];
  public wordToGuess: ShowModel[] = [];
  private interval: any;
  private timerSeconds = 0;
  private timerMinutes = 0;
  private timerHours = 0;
  public timer = '00:00:00';
  private pauseTimer = false;

  constructor(private apiService: ApiConnectService,
              private wordSevice: WordService,
              public dialog: MatDialog,
              private router: Router,
              private readonly store: Store)
  { }

  ngOnInit() {
    this.getWord();
    this.checkWord();
    this.runTimer();
  }

  getWord() :void
  {
    this.wordToGuess = [];
    this.roundWord = this.getRandom();
    this.apiService.getWords()
      .pipe(
        take(1)
      )
      .subscribe(
      (wordsList)  => {
        wordsList.filter(word => word.id === this.roundWord[this.roundWord.length-1])
          .map(word => {
            this.store.dispatch(UpdateNewWord({ word: word.word }));
            word.word.split('')
              .map(letter => this.wordToGuess.push({letter: letter, show: false}))
          });
      }
    );
  }

  getRandom(): Array<number> {
      this.wordId = Math.floor(Math.random() * (this.maxValue) - this.minValue +1 ) + this.minValue;
      if(this.roundWord.includes(this.wordId)) {
        this.getRandom();
      }
      else {
        this.roundWord.push(this.wordId);
      }
      return this.roundWord;
  }

  checkWord(): void {
    this.wordSevice.getLetterToCheck().subscribe(
      (letter: string) => {
        console.log(letter);
        if(letter) {
          this.showLetter(letter);
          this.errorCounter$.subscribe(errors => {
            if (errors === 6) {
              this.store.dispatch(ResetErrorCount());
              this.store.dispatch(ResetScore());
              this.showErrorDialog();
            }
          });

          if (!this.wordToGuess.find(word => !word.show)) {
            this.store.dispatch(UpdateRound());
            this.wordSevice.sendInfoNewRound(1);
            this.store.dispatch(UpdateScore({ score: this.wordToGuess.length}))
            this.getWord();
            this.roundNumber$.subscribe(round => {
              if (round === 5) {
                this.showSuccessDialog();
              }
            })
          }
        }
      }
    );
  }

  runTimer()
  {
    this.interval = setInterval(() =>
    {
      if(this.pauseTimer === true)
      {
        this.timer = (this.timerHours < 10 ? '0' + this.timerHours : this.timerHours) + ':' + (this.timerMinutes < 10 ? '0' + this.timerMinutes : this.timerMinutes) + ':' + (this.timerSeconds < 10 ? '0'+this.timerSeconds : this.timerSeconds);
      }
      else
      {
        if(this.timerSeconds < 60)
        {
          this.timerSeconds++
          this.timer = (this.timerHours < 10 ? '0' + this.timerHours : this.timerHours) + ':' + (this.timerMinutes < 10 ? '0' + this.timerMinutes : this.timerMinutes) + ':' + (this.timerSeconds < 10 ? '0'+this.timerSeconds : this.timerSeconds);
        }
        else if(this.timerSeconds % 60 === 0)
        {
          this.timerSeconds = -1;
          this.timerSeconds++;
          this.timerMinutes = this.timerMinutes + 1;
          if(this.timerMinutes % 60 === 0)
          {
            this.timerMinutes = 0;
            this.timerHours = this.timerHours + 1;
          }
          this.timer = (this.timerHours < 10 ? '0' + this.timerHours : this.timerHours) + ':' + (this.timerMinutes < 10 ? '0' + this.timerMinutes : this.timerMinutes) + ':' + (this.timerSeconds < 10 ? '0'+this.timerSeconds : this.timerSeconds);
        }
      }
    }, 1000);
  }

  private showLetter(letter: string): void {
    const test = this.wordToGuess.find(w => w.letter == letter);
    if (test) {
      this.wordToGuess.filter(word => word.letter === letter).map(word => word.show = true)
    }
    else {
      this.setError();
    }
  }

  private setError(): void {
    this.store.dispatch(UpdateErrorCount());
  }

  private showErrorDialog(): void {
    this.dialog.open(DialogComponent,
    {
      width: '400px',
      height: '400px',
      panelClass: 'dialog'
    });
  }

  private showSuccessDialog(): void {
    this.pauseTimer = true;
    this.dialog.open(DialogFinishGameComponent,
      {
        width: '400px',
        height: '420px',
        data: { time: this.timer },
        panelClass: 'dialog'
      });
  }
}
