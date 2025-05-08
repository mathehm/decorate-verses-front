import { Injectable } from '@angular/core';
import { interval, Subject, Observable } from 'rxjs';
import { take, takeUntil, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TimerService {
  private stop$ = new Subject<void>();

  start(seconds: number): Observable<number> {
    this.stop$.next();

    return interval(1000).pipe(
      take(seconds),
      takeUntil(this.stop$),
      map(i => seconds - i - 1)
    );
  }

  stop() {
    this.stop$.next();
  }
}
