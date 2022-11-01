import { createAction, props } from "@ngrx/store";

export enum HangmanActionType {
    UpdateUser = '[Hangman] Update user',
    UpdateSelectedLetterToCheck = '[Hangman] Check letter',
    UpdateRound = '[Hangman] Update round',
    ResetRound = '[Hangman] Reset round',
    UpdateErrorCount = '[Hangman] Update error count',
    ResetErrorCount = '[Hangman] Reset error count',
    UpdateNewWord = '[Hangman] Update new word',
    UpdateScore = '[Hangman] Update score',
    ResetScore = '[Hangman] reset score'
}

export const UpdateUser = createAction(
    HangmanActionType.UpdateUser,
    props<{ user: string }>()
);

export const UpdateNewWord = createAction(
  HangmanActionType.UpdateNewWord,
  props<{ word: string }>()
)

export const UpdateSelectedLetterToCheck = createAction(
    HangmanActionType.UpdateSelectedLetterToCheck,
    props<{ selectedLetter: string }>()
);

export const UpdateRound = createAction(
    HangmanActionType.UpdateRound
);

export const ResetRound = createAction(
    HangmanActionType.ResetRound
);

export const UpdateErrorCount = createAction(HangmanActionType.UpdateErrorCount);

export const ResetErrorCount = createAction(
    HangmanActionType.ResetErrorCount
);

export const UpdateScore = createAction(
  HangmanActionType.UpdateScore,
  props<{ score: number }>());

export const ResetScore = createAction(HangmanActionType.ResetScore);
