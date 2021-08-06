import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { KeyboardComponent } from './main-game/keyboard/keyboard.component';
import { HangmanComponent } from './main-game/hangman/hangman.component';
import { WordFindComponent } from './main-game/word-find/word-find.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { DialogComponent } from './main-game/word-find/dialog/dialog.component';
import { UserComponent } from './user/user.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MainGameComponent } from './main-game/main-game.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    HangmanComponent,
    WordFindComponent,
    DialogComponent,
    UserComponent,
    MainGameComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
