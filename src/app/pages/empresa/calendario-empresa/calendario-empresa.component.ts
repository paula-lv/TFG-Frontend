import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendario-empresa',
  templateUrl: './calendario-empresa.component.html',
  styleUrls: ['./calendario-empresa.component.scss']
})
export class CalendarioEmpresaComponent implements OnInit {

  public events: any[];
  public options: any;

  constructor() { }

  ngOnInit(): void {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      locale: esLocale,
      headerToolbar: {
        start: 'prev,next',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      titleFormat: { year: 'numeric', month: 'long' } ,
      editable: false
    }

    this.events = [
      {
        title: "Corte de pelo",
        start: new Date(),
        description: "Corte de pelo uwu",
        classNames: ['peluqueria']
      },
      {
        title: "Tinte",
        start: new Date(new Date().getTime() + 3600000),
        description: "Tinte fantasía pelo corto",
        classNames: ['peluqueria']
      },
      {
        title: "Manicura",
        start: new Date(new Date().getTime() + 86400000),
        description: "Francesa"
      },
      {
        title: "Pedicura",
        start: new Date(new Date().getTime() + 86400000 * 2),
        end: new Date(new Date().getTime() + 86400000 * 3),
        description: "Permanente"
      },
    ]
  }

}
