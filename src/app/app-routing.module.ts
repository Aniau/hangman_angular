import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { HangmanComponent } from './hangman/hangman.component';

const routes: Routes = [
{ path: '', component: UserComponent},
{ path: 'hangman', component: HangmanComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
