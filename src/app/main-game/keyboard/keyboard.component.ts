import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WordService } from '../../service/word.service';
import { KeyShow } from '../../model/KeyShow'

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {
  public qwerty: string = 'qwertyuiopasdfghjklzxcvbnm';
  public keyboard: KeyShow[] = [];
  private audioCorrect = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_shoot.wav');
  private audioFail = new Audio('https://rpg.hamsterrepublic.com/wiki-images/7/72/Metal_Hit.ogg');
  
  constructor(private wordSevice: WordService) { }


  ngOnInit()
  {
    let keySplitted = this.qwerty.split('');
    for(let key of keySplitted)
    {
      let keys = new KeyShow(key, false);
      this.keyboard.push(keys);
    }

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
      },
      error => 
      {
        console.log(error);
      }
    )
  }

  onKeyUp(letter: string)
  {
    for(let key of this.keyboard)
    {
      if(key.letter === letter)
      {
        key.show = true;
      }
    }    
    this.wordSevice.sendLetterToCheck(letter);
  }
}
