import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { TimerService } from '../services/timer.services';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  screen: 'start' | 'quiz' | 'end' = 'start';
  verse = '';
  options: string[] = [];
  correct = '';
  score = 0;
  timer = 15;
  timerSub?: Subscription;
  selectedOption: string | null = null;

  constructor(
    private quizService: QuizService,
    private timerService: TimerService
  ) {}

  ngOnInit(): void {}

  startQuiz() {
    this.quizService.reset();
    this.screen = 'quiz';
    this.loadQuestion();
  }

  loadQuestion() {
    this.selectedOption = null;
    
    const { verse, correct, options } = this.quizService.getCurrentQuestion();
    this.verse = verse;
    this.correct = correct;
    this.options = options;

    this.timerSub = this.timerService.start(15).subscribe(seconds => {
      this.timer = seconds;
      if (seconds === 0) this.onTimeout();
    });
  }

  selectOption(option: string) {
    if (this.selectedOption) return;

    this.selectedOption = option;
    this.timerService.stop();

    setTimeout(() => {
      if (option === this.correct) this.quizService.addPoint();

      if (this.quizService.nextQuestion()) {
        this.loadQuestion();
      } else {
        this.finishQuiz();
      }
    }, 1000);
  }

  onTimeout() {
    this.finishQuiz();
  }

  finishQuiz() {
    this.timerService.stop();
    this.score = this.quizService.getScore();
    this.screen = 'end';
  }

  ngOnDestroy() {
    this.timerService.stop();
    this.timerSub?.unsubscribe();
  }
}
