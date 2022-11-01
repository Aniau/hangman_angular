import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WordService } from '../../service/word.service';
import { ShowModel } from '../../model/ShowModel'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {
  public keyboard: ShowModel[] = [];
  private qwerty: string[] = 'qwertyuiopasdfghjklzxcvbnm'.split('');

  constructor(private wordSevice: WordService,
              private readonly store: Store) { }

  ngOnInit()
  {
    this.qwerty.map(letter => this.keyboard.push({ letter: letter, show: false }));
    this.wordSevice.getInfoNewRound().subscribe(
      result =>
      {
        if(result === 1)
        {
          for(let key of this.keyboard)
          {
              key.show = false;
          }
        }
      }
    )
  }

  onKeyUp(letter: string)
  {
    this.keyboard.filter(key => key.letter === letter).map(key => key.show = true);

    this.wordSevice.sendLetterToCheck(letter);
  }
}
