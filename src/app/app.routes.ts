import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';

export const routes: Routes = [
    { path: '', redirectTo: 'quiz', pathMatch: 'full' },
    { path: 'quiz', component: QuizComponent },
    { path: '**', redirectTo: 'verses' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
