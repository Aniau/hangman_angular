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
import { DialogFinishGameComponent } from './main-game/word-find/dialog-finish-game/dialog-finish-game.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HangmanReducer } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    HangmanComponent,
    WordFindComponent,
    DialogComponent,
    UserComponent,
    MainGameComponent,
    DialogFinishGameComponent
  ],
  imports: [
    StoreModule.forRoot({
      hangman: HangmanReducer
    }),
    EffectsModule.forRoot([]),
    BrowserModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument()
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
