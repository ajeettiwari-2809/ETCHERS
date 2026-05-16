import { Component, signal } from '@angular/core';
import { Router, RouterOutlet,NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ngowebsite');

   constructor(private router: Router) {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {

        // For full page scroll
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // optional
        });

      });
  }
}
