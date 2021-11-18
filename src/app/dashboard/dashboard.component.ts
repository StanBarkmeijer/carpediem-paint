import {
  Component
} from '@angular/core';
import {
  map
} from 'rxjs/operators';
import {
  Breakpoints,
  BreakpointObserver
} from '@angular/cdk/layout';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  content: string = `<p>Deze applicatie is gemaakt in opdracht voor <a href='https://carpediemshipping.nl/nl/' target='#blank'>CarpeDiem Shipping</a> en Avans Hogeschool.<br /> 
  Deze applicatie maakt het mogelijk om makkelijk vanaf een schip een order voor verf te maken. Voorheen werd dit niet effectief gedaan.<br />
  Gebruikers kunnen aangeven voor welk gedeelte verf nodig is, en hoeven zelf niet de specifieke verfnamen op te zoeken op internet.<br />
  Wanneer geselecteerd is wat nodig is, zal de order naar de administrator gestuurd worden. Deze administrator zal dan ook een mail ontvangen met informatie over deze order.<br />
  Er zal ook een voorraad bijgehouden moeten worden, zodat er gekeken kan worden naar hoeveel verf er gekocht moet worden, en hoeveel uit voorraad gepakt kan worden.</p>`;

  datamodel: string = `<p>De datamodellen die nodig zijn voor deze applicatie.<br/>
  Als de foto niet goed te lezen is, klik <a href="/assets/images/ShipDiagram.drawio.png" target="#blank">op mij</a><br /></p>
  <img src="../../assets/images/ShipDiagram.drawio.png" height="300px" width="auto">`

  entitenten: string = `<p>De entiteiten die nodig zijn voor dit programma:<br />
  <b>Users: </b> Natuurlijk is een user entiteit belangrijk om mee te beginnen. Hiermee loggen gebruikers in, en plaatsen orders mee. 
  Gebruikers hebben toegang tot een of meer schepen, omdat dit persoon soms nodig is op een ander schip, waar hij ook orders voor verf op zou kunnen plaatsen. <br />
  <b>Schepen: </b> Schepen hebben 3 hoofddelen, het voorschip, middenschip en achterschip. Op elk schip zijn er verschillende onderdelen die allemaal hun eigen verfkleur hebben. 
  Omdat er verschillende soorten schepen zijn, wordt er gebruik gemaakt van een overigen array. Bij een cementpoeder schip zoals de MS Manu Forti, zijn er balasttanken aanwezig. 
  Op een ander schip zoals een beunschip, is er sprake van een ruim. Door gebruik te maken van een overigen array, is het mogelijk om makkelijk onderdelen per schip te veranderen<br />
  <b>Verf: </b> Hier draait het om. Verf. Om makkelijk en snel verf toe te voegen, verwijderen, veranderen en selecteren in het systeem, is het belangrijk om dit ook als entiteit te zien.
  Wanneer een gebruiker geen verfsoort uit een DB zou kunnen kiezen, zou hij het zelf in moeten voeren. Deze entiteit wordt dus gebruikt om dit gehele process te versnellen en makkelijker te maken.<br />
  <b>Order: </b> Om daadwerkelijk een order te kunnen zien en plaatsen, en zien, is er een order entity nodig. Hier kunnen we zien wie de order heeft geplaatst, wanneer, en welke verf er dan precies nodig is.</p>`;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({
      matches
    }) => {
      // Reminder: uncomment if changes in cols are needed
      // 
      if (matches) {
        return [{
            title: 'Carpediem Shipping Paint',
            content: this.content,
            cols: 2,
            rows: 2
          },
          {
            title: 'Datamodel',
            content: this.datamodel,
            cols: 2,
            rows: 3
          },
          {
            title: 'Entiteiten',
            content: this.entitenten,
            cols: 2,
            rows: 2
          }
        ];
      }

      return [{
          title: 'Carpediem Shipping Paint',
          content: this.content,
          cols: 1,
          rows: 1
        },
        {
          title: 'Datamodel',
          content: this.datamodel,
          cols: 1,
          rows: 1
        },
        {
          title: 'Entiteiten',
          content: this.entitenten,
          cols: 2,
          rows: 1
        }
      ];
    })
  );

  open(): void {
    this.router.navigate(["/assets/images/ShipDiagram.drawio.png"]);
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}
}
