import { Component, OnChanges, OnInit } from '@angular/core';
import { ApiConnectService } from '../service/api-connect.service';
import { words } from '../model/answer';
import { Observable } from 'rxjs';
import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { WordService } from '../service/word.service';

@Component({
  selector: 'app-word-find',
  templateUrl: './word-find.component.html',
  styleUrls: ['./word-find.component.css']
})
export class WordFindComponent implements OnInit,  OnChanges {
  private minValue: number = 1;
  private maxValue: number = 30;
  public wordId = 0;
  private roundWord: Array<number> = [];
  public wordsResult: words[] = [];
  public wordToGuess: Array<string> = [];
  public letterToCheck: string = '';
  public errorCheck: Array<number> = [];
  public roundNumber: number = 1;
  public show = false;

  constructor(private apiService: ApiConnectService, private wordSevice: WordService) { }

  ngOnInit() {
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
    
    this.wordSevice.getLetterToCheck().subscribe(
      (letter: string) => {
          console.log(letter);
          this.letterToCheck = letter;
          if(this.wordToGuess.includes(letter) === true)
          {
            console.log('yes');
            this.show = true;
          }
          else if(this.letterToCheck !== 'undefined')
          {
            console.log('false');
            this.show = false;
            this.errorCheck.push(1);
            console.log(this.errorCheck);
            this.wordSevice.sendErrorValues(this.errorCheck);
          }
      },
      error => 
      {
        console.log(error);
      }
    );

  }
  
  ngOnChanges()
  {
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

//  getWord(id: number): string
//  {
//    let w = this.words.find(t => t===id);
//    return w;
//  }

}
