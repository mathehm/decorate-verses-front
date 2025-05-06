import { Injectable } from '@angular/core';
import { VERSES } from '../data/verses';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private index = 0;
  private score = 0;

  getCurrentQuestion() {
    const current = VERSES[this.index];
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

    return [...incorrect, correct].sort(() => 0.5 - Math.random());
  }

  nextQuestion(): boolean {
    this.index++;
    return this.index < VERSES.length;
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
  }

  isLastQuestion() {
    return this.index >= VERSES.length - 1;
  }
}
