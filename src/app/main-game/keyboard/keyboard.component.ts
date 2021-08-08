import { Component, OnInit } from '@angular/core';
import { WordService } from '../../service/word.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {
  public qwerty: string = 'qwertyuiopasdfghjklzxcvbnm';
  public keyboard: Array<string> = [];
  public isClicked = false;

  constructor(private wordSevice: WordService) { }


  ngOnInit()
  {
    this.keyboard = this.qwerty.split('');
    console.log(this.keyboard);
    this.wordSevice.getErrors().subscribe(
      (result: number[]) => {
        console.log(result);
        console.log(result);
      },
      error => {
        console.log(error);
      }
      );
  }

  onKeyUp(letter: string)
  {
    console.log(letter);    
    this.isClicked = true;
    console.log(this.isClicked);
    this.wordSevice.sendLeterToCheck(letter);
  }

}
