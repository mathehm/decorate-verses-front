import { Injectable } from '@angular/core';
import { VERSES } from '../data/verses';
import { IVerse } from '../data/verse.model';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private index = 0;
  private score = 0;
  private shuffledVerses = [...VERSES];

  private shuffle<T>(array: T[]): T[] {
    return array.sort(() => 0.5 - Math.random());
  }

  getCurrentQuestion() {
    const current: IVerse = this.shuffledVerses[this.index];
    const options = this.generateOptions(current.reference);
    return {
      verse: current.text,
      correct: current.reference,
      options,
    };
  }

  generateOptions(correct: string): string[] {
    const incorrect = VERSES
      .map(v => v.reference)
      .filter(r => r !== correct)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    return this.shuffle([...incorrect, correct]);
  }

  nextQuestion(): boolean {
    this.index++;
    return this.index < this.shuffledVerses.length;
  }

  addPoint() {
    this.score++;
  }

  getScore() {
    return this.score;
  }

  reset() {
    this.index = 0;
    this.score = 0;
    this.shuffledVerses = this.shuffle([...VERSES]);
  }

  isLastQuestion() {
    return this.index >= this.shuffledVerses.length - 1;
  }
}
