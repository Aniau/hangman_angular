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
  public wordId = 0;
  private roundWord: Array<number> = [];
  public wordsResult: words[] = [];
  public wordToGuess: LetterShow[] = [];
  public letterToCheck: string = '';
  public errorCheck: Array<number> = [];
  public correctLetters: Array<string> = [];
  public lettersPush: Array<string> = [];
  public findMultipleLetters: Array<string> = []; 
  public roundNumber: number = 1;
  public show = false;
  public userLogin: string = '';
  public score: number = 0;

  constructor(private apiService: ApiConnectService, private wordSevice: WordService, private getUserLogin: GetUserLoginService, public dialog: MatDialog,
              private router: Router) 
  { 
  }
  
  ngOnInit() {
    this.getWord();
    this.checkWord();
    this.getLogin();
  }
  
  getLogin(): void
  {
    this.getUserLogin.getUserLogin().subscribe(
      result => 
      {
        this.userLogin = result;
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
      (result)  => {
        for(let i of result)
        {
          if(Number(i.id) === Number(this.roundWord[this.roundWord.length-1]))
          {
            let wordSplitted = i.word.split('');
            for(let word of wordSplitted)
            {
              let words = new LetterShow(word, false);
              this.wordToGuess.push(words);
              console.log(this.wordToGuess);
            }
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
            
            console.log(this.letterToCheck);
            if(this.lettersPush.includes(letter) === true)
            {
              this.findMultipleLetters = this.lettersPush.filter((x) => x.includes(letter));
              
              for(let x of this.findMultipleLetters)
              {
                this.correctLetters.push(x);
              }

              for(let d of this.wordToGuess)
              {
                if(d.letter === letter)
                {
                  d.show = true;
                }
              }

              if(this.correctLetters.length === this.wordToGuess.length)
              {
                this.score = this.score + Number(this.correctLetters.length) - Number(this.errorCheck.length);
                this.roundNumber = this.roundNumber+1;
                this.wordToGuess = [];
                this.errorCheck = [];
                this.correctLetters = [];
                this.lettersPush = [];
                this.wordSevice.sendErrorValues(this.errorCheck);
                this.wordSevice.sendInfoNewRound(1);
                this.getWord();
                this.getLogin();

                if (this.roundNumber > 5)
                {
                  const dialogRefFinish = this.dialog.open(DialogFinishGameComponent,
                    {
                      width: '400px',
                      height: '420px',
                      hasBackdrop: true,
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
                this.errorCheck.push(1);
                console.log(this.errorCheck);
                this.wordSevice.sendErrorValues(this.errorCheck);
                if(this.errorCheck.length === 6 && this.correctLetters.length !== this.wordToGuess.length)
                {
                  const dialogRef = this.dialog.open(DialogComponent,
                  {
                    width: '400px',
                    height: '400px',
                    hasBackdrop: true,
                    data: { score: this.score, login: this.userLogin },
                    panelClass: 'dialog'
                  });
    
                  dialogRef.afterClosed().subscribe(result => 
                  {
                    this.wordToGuess = [];
                    this.errorCheck = [];
                    this.correctLetters = [];
                    this.lettersPush = [];
                    this.letterToCheck = '';
                    console.log('runagain');
                    this.wordSevice.sendErrorValues(this.errorCheck);
                    this.router.navigate(['']);
                  });
                }
              }
          }
          else 
          {
            this.errorCheck = [];
            this.wordSevice.sendErrorValues(this.errorCheck);
          }
        },
        error => 
        {
          console.log(error);
        }
      );
    }
}
