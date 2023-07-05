import { Component } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router ) { }

  ruta: any = this.router;
  header: boolean = false;

  ngOnInit()  {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
          this.ruta = event.url;
          this.header = false;
          if(this.ruta != '/login' && this.ruta != '/registro' && this.ruta != '/recuperar') {
            this.header = true;
          }
      }
  });
  }
}
