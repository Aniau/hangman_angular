import { Component, OnInit } from '@angular/core';
import { ApiConnectService } from '../../service/api-connect.service';
import { words } from '../../model/answer';
import { MatDialog } from '@angular/material/dialog';
import { WordService } from '../../service/word.service';
import { DialogComponent } from '../word-find/dialog/dialog.component';
import { GetUserLoginService } from '../../service/get-user-login.service';

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
  public wordToGuess: Array<string> = [];
  public letterToCheck: string = '';
  public errorCheck: Array<number> = [];
  public correctLetters: string[][] = [[],[]];
  public findMultipleLetters: Array<string> = []; 
  public roundNumber: number = 1;
  public show = false;
  public userLogin: string = '';
  public score: number = 0;
  // @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;

  constructor(private apiService: ApiConnectService, private wordSevice: WordService, private getUserLogin: GetUserLoginService, public dialog: MatDialog) 
  { 
  }
  
  ngOnInit() {
    this.getWord();
    this.checkWord();
    this.getUserLogin.getUserLogin().subscribe(
      result => 
      {
        console.log(result);
        this.userLogin = result;
      },
      error => 
      {
        console.log(error);
      }
    )
  }
  
  getWord(): void
  {
    this.roundWord = this.getRandom();
    this.apiService.getWords().subscribe(
      result => {
        for(let i of result)
        {
          if(Number(i.id) === Number(this.roundWord))
          {
            console.log('id: ' + i.id + ' and ' + this.roundWord + ' are equal -> ' + i.word); 
            console.log(i.word.split(''));
            this.wordToGuess = i.word.split('');
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
      console.log(Math.floor(Math.random() * (this.maxValue - this.minValue +1 )));
      this.wordId = Math.floor(Math.random() * (this.maxValue) - this.minValue +1 ) + this.minValue;
      if(this.roundWord.includes(this.wordId) === true)
      {
        this.getRandom();
      }
      else
      {
        this.roundWord.push(this.wordId);
      }
      console.log(this.roundWord);
      return this.roundWord;
  }

  checkWord(): void
  {
    this.wordSevice.getLetterToCheck().subscribe(
      (letter: string) => {
          console.log(typeof letter);
          console.log();
          if(letter !== '')
          {
            this.letterToCheck = letter;
            if(this.wordToGuess.includes(letter) === true)
            {
              console.log('yes');
              this.findMultipleLetters = this.wordToGuess.filter(x => x.includes(letter));
  
              for(let x of this.findMultipleLetters)
              {
                this.correctLetters.push([x]);
              }
              console.log(this.correctLetters);
              this.show = true;
  
              if(this.correctLetters.length === this.wordToGuess.length)
              {
                console.log('new round');
                this.wordToGuess = [];
                this.errorCheck = [];
                this.correctLetters = [];
                this.getWord();
                this.checkWord();
                this.roundNumber = this.roundNumber+1;
              }
            }
            else if(this.letterToCheck !== 'undefined')
            {
              console.log('false');
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
                  panelClass: 'dialog'
                });
  
                dialogRef.afterClosed().subscribe(result => 
                {
                    window.location.reload();
                });
              }
            }
            else if(this.correctLetters.length === this.wordToGuess.length)
            {
              console.log('new round');
              this.roundNumber = this.roundNumber+1;
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

//  getWord(id: number): string
//  {
//    let w = this.words.find(t => t===id);
//    return w;
//  }
  // openDialog(templateRef: TemplateRef<any>)
  // {
  //   const dialogRefAdd = this.dialog.open(this.callAPIDialog);
  // }
}