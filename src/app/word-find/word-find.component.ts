import { Component, OnInit } from '@angular/core';
import { Words } from 'src/assets/answers.json';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-word-find',
  templateUrl: './word-find.component.html',
  styleUrls: ['./word-find.component.css']
})
export class WordFindComponent implements OnInit {
  public minValue: number = 0;
  public maxValue: number = 0;
  public words = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/answer.json').subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

  getRandom(): number
  {
      this.minValue;
      this.maxValue;
      console.log(Math.floor(Math.random() * (this.maxValue - this.minValue +1 )));
      return Math.floor(Math.random() * (this.maxValue) - this.minValue +1 ) + this.minValue;
  }

}
