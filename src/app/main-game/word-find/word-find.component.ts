import { Component, OnInit } from '@angular/core';
import { ApiConnectService } from '../../service/api-connect.service';
import { words } from '../../model/answer';
import { LetterShow } from '../../model/letterShow'
import { MatDialog } from '@angular/material/dialog';
import { WordService } from '../../service/word.service';
import { DialogComponent } from '../word-find/dialog/dialog.component';
import { GetUserLoginService } from '../../service/get-user-login.service';
import { DialogFinishGameComponent } from './dialog-finish-game/dialog-finish-game.component';
import { Router } from '@angular/router';

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
  private minValue: number = 1;
  private maxValue: number = 30;
  private wordId = 0;
  private roundWord: Array<number> = [];
  public wordsResult: words[] = [];
  public wordToGuess: LetterShow[] = [];
  private letterToCheck: string = '';
  public errorList: Array<number> = [];
  private correctLetters: Array<string> = [];
  private lettersPush: Array<string> = [];
  private findMultipleLetters: Array<string> = []; 
  public roundNumber: number = 1;
  public show = false;
  public userLogin: string = '';
  public score: number = 0;
  private interval: any;
  private timerSeconds = 0;
  private timerMinutes = 0;
  private timerHours = 0;
  public timer = '00:00:00';
  private pauseTimer = false;

  constructor(private apiService: ApiConnectService, 
              private wordSevice: WordService, 
              private getUserLogin: GetUserLoginService, 
              public dialog: MatDialog,
              private router: Router) 
  { }
  
  ngOnInit() {
    this.getWord();
    this.checkWord();
    this.getLogin();
    this.runTimer();
  }
  
  getLogin(): void
  {
    this.getUserLogin.getUserLogin().subscribe(
      login => 
      {
        this.userLogin = login;
      },
      error => 
      {
        console.log(error);
      }
    )
  }

  getWord() :void
  {
    this.roundWord = this.getRandom();
    this.apiService.getWords().subscribe(
      (wordsList)  => {
        for(let i of wordsList)
        {
          if(Number(i.id) === Number(this.roundWord[this.roundWord.length-1]))
          {
            let wordSplitted = i.word.split('');
            for(let word of wordSplitted)
            {
              let words = new LetterShow(word, false);
              this.wordToGuess.push(words);
            }
            console.log(this.wordToGuess);
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getRandom(): Array<number>
  {
      this.minValue;
      this.maxValue;
      this.wordId = Math.floor(Math.random() * (this.maxValue) - this.minValue +1 ) + this.minValue;
      if(this.roundWord.includes(this.wordId) === true)
      {
        this.getRandom();
      }
      else
      {
        this.roundWord.push(this.wordId);
      }
      return this.roundWord;
    }
    
    checkWord(): void
    {
      this.wordSevice.getLetterToCheck().subscribe(
        (letter: string) => 
        {
          if(letter !== '')
          {
            if(this.lettersPush.length === 0)
            {
              for(let y of this.wordToGuess)
              {
                this.lettersPush.push(y.letter);
              }

            }
            this.letterToCheck = letter;
            
            if(this.lettersPush.includes(letter) === true)
            {
              this.findMultipleLetters = this.lettersPush.filter((x) => x.includes(letter));
              
              for(let filterLetter of this.findMultipleLetters)
              {
                this.correctLetters.push(filterLetter);
              }

              for(let oneLetter of this.wordToGuess)
              {
                if(oneLetter.letter === letter)
                {
                  oneLetter.show = true;
                }
              }

              if(this.correctLetters.length === this.wordToGuess.length)
              {
                this.score = this.score + Number(this.correctLetters.length) - Number(this.errorList.length);
                this.roundNumber = this.roundNumber+1;
                this.wordToGuess = [];
                this.errorList = [];
                this.correctLetters = [];
                this.lettersPush = [];
                this.wordSevice.sendErrorValues(this.errorList);
                this.wordSevice.sendInfoNewRound(1);
                this.getWord();
                this.getLogin();

                if (this.roundNumber > 5)
                {
                  this.pauseTimer = true;
                  this.runTimer();
                  const dialogRefFinish = this.dialog.open(DialogFinishGameComponent,
                    {
                      width: '400px',
                      height: '420px',
                      hasBackdrop: true,
                      data: { score: this.score, login: this.userLogin, time: this.timer },
                      panelClass: 'dialog'
                    });
                    
                    dialogRefFinish.afterClosed().subscribe(result => 
                    {
                      this.router.navigate(['']);
                      this.getLogin();
                    });
                  }
                }
              }
              else
              {
                this.show = false;
                this.errorList.push(1);
                this.wordSevice.sendErrorValues(this.errorList);

                if(this.errorList.length === 6 && this.correctLetters.length !== this.wordToGuess.length)
                {
                  const dialogRef = this.dialog.open(DialogComponent,
                  {
                    width: '400px',
                    height: '400px',
                    hasBackdrop: true,
                    panelClass: 'dialog'
                  });
    
                  dialogRef.afterClosed().subscribe(result => 
                  {
                    this.wordToGuess = [];
                    this.errorList = [];
                    this.correctLetters = [];
                    this.lettersPush = [];
                    this.letterToCheck = '';
                    this.wordSevice.sendErrorValues(this.errorList);
                    this.router.navigate(['']);
                  });
                }
              }
          }
          else 
          {
            this.errorList = [];
            this.wordSevice.sendErrorValues(this.errorList);
          }
        },
        error => 
        {
          console.log(error);
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
          console.log(this.timer);
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
}
