import { createFeatureSelector, createSelector } from "@ngrx/store";

export const hangmanSelector = createFeatureSelector<{
    user: string;
    selectedLetter: string;
    word: string;
    errorsCount: number;
    round: number;
    score: number;
}>('hangman');

export const getUserSelector = createSelector(hangmanSelector, hangman => hangman.user);

export const getRoundSelector = createSelector(hangmanSelector, hangman => hangman.round);

export const getErrorCounterSelector = createSelector(hangmanSelector, hangman => hangman.errorsCount);

export const getSelectedLetter = createSelector(hangmanSelector, hangman => hangman.selectedLetter);

export const getScoreSelector = createSelector(hangmanSelector, hangman => hangman.score);
