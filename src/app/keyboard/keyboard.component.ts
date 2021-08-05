import { Component, OnInit } from '@angular/core';
import { WordService } from '../service/word.service';

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
    this.wordSevice.getErrors().subscribe(
      (result: number[]) => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
      );
  }

  onKeyUp(e: any)
  {
    console.log(e.target.value);  
    this.isClicked = true;
    console.log(this.isClicked);
    this.wordSevice.sendLeterToCheck(e.target.value);
  }

}
