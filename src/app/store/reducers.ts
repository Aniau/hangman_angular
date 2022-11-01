import { createReducer, on } from '@ngrx/store';
import {
  ResetErrorCount, ResetRound, ResetScore,
  UpdateErrorCount,
  UpdateNewWord,
  UpdateRound, UpdateScore,
  UpdateSelectedLetterToCheck,
  UpdateUser
} from './actions';

export interface State {
    user: string,
    selectedLetter: string,
    word: string,
    errorsCount: number,
    round: number,
    score: number
}

export const initialState: State = {
    user: '',
    selectedLetter: '',
    word: '',
    errorsCount: 0,
    round: 1,
    score: 0
}

export const HangmanReducer = createReducer(
    initialState,
    on(UpdateUser, (state, action) => ({...state, user: action.user})),
    on(UpdateSelectedLetterToCheck, (state, action) => ({...state, selectedLetter: action.selectedLetter})),
    on(UpdateNewWord, (state, action) => ({...state, word: action.word})),
    on(UpdateErrorCount, state => ({...state, errorsCount: state.errorsCount + 1 })),
    on(ResetErrorCount, state => ({...state, errorsCount: 0 })),
    on(UpdateRound, state => ({...state, round: state.round + 1 })),
    on(ResetRound, state => ({...state, round: 0 })),
    on(ResetScore, state => ({...state, score: 0})),
    on(UpdateScore, (state, action) => ({...state, score: state.score + action.score - state.errorsCount}))
);
