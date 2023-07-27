import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import { CitaService } from 'src/app/services/cita.service';

@Component({
  selector: 'app-calendario-empresa',
  templateUrl: './calendario-empresa.component.html',
  styleUrls: ['./calendario-empresa.component.scss']
})
export class CalendarioEmpresaComponent implements OnInit {

  public events: any[];
  public options: any;

  cargado = false;

  constructor(private citaService: CitaService) { }

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
    ]

    this.citaService.getCitas(JSON.parse(localStorage.getItem('usuario')!).email, false, false).subscribe(res => {
      let citas = res;
      for(let i = 0; i < citas.length; i++) {
        let evento = {
          title: citas[i].servicio,
          start: new Date(citas[i].fecha_desde).getTime() - (3600000*2),
          end: new Date(citas[i].fecha_hasta).getTime() - (3600000*2),
          color: '#51D5B8',
          description: citas[i].empresa,
        }
        this.events.push(evento)
      }
      this.cargado = true
    })
  }

}
