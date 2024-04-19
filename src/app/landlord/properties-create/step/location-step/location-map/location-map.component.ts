import {Component, effect, EventEmitter, inject, input, Output} from '@angular/core';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {FormsModule} from "@angular/forms";
import {AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent} from "primeng/autocomplete";
import {CountryService} from "../country.service";
import {ToastService} from "../../../../../layout/toast.service";
import {OpenStreetMapProvider} from "leaflet-geosearch";
import {Country} from "../country.model";
import L, {circle, latLng, polygon, tileLayer} from "leaflet";
import {filter} from "rxjs";

@Component({
  selector: 'app-location-map',
  standalone: true,
  imports: [
    LeafletModule,
    FormsModule,
    AutoCompleteModule
  ],
  templateUrl: './location-map.component.html',
  styleUrl: './location-map.component.scss'
})
export class LocationMapComponent {

  countryService = inject(CountryService);
  toastService = inject(ToastService);

  private map: L.Map | undefined;
  private provider: OpenStreetMapProvider | undefined;

  location = input.required<string>();
  placeholder = input<string>("Select your home country");

  currentLocation: Country | undefined;

  @Output()
  locationChange = new EventEmitter<string>();

  formatLabel = (country: Country) => country.flag + "   " + country.name.common;

  options = {
    layers: [
      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {maxZoom: 18, attribution: "..."}),
    ],
    zoom: 5,
    center: latLng(46.87996, -121.726909)
  }

  layersControl = {
    baseLayers: {
      "Open Street Map": tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "..."
      }),
    },
    overlays: {
      "Big Circle": circle([46.95, -122], {radius: 5000}),
      "Big square": polygon([[46.8, -121.55], [46.8, -121.55], [46.8, -121.55], [46.8, -121.55]])
    }
  }

  countries: Array<Country> = [];
  filteredCountries: Array<Country> = [];


  constructor() {
    this.listenToLocation();
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.configSearchControl();
  }

  private configSearchControl() {
    this.provider = new OpenStreetMapProvider();
  }

  onLocationChange(newEvent: AutoCompleteSelectEvent) {
    const newCountry = newEvent.value as Country;
    this.locationChange.emit(newCountry.cca3);
  }

  private listenToLocation() {
    effect(() => {
      const countriesState = this.countryService.countries();
      if (countriesState.status === "OK" && countriesState.value) {
        this.countries = countriesState.value;
        this.filteredCountries = countriesState.value;
        this.changeMapLocation(this.location())
      } else if (countriesState.status === "ERROR") {
        this.toastService.send({
          severity: "error", summary: "Error",
          detail: "Something went wrong when loading countries on change location"
        });
      }
    });
  }

  private changeMapLocation(term: string) {
    this.currentLocation = this.countries.find(country => country.cca3 === term);
    if (this.currentLocation) {
      this.provider!.search({query: this.currentLocation.name.common})
        .then((results) => {
          if (results && results.length > 0) {
            const firstResult = results[0];
            this.map!.setView(new L.LatLng(firstResult.y, firstResult.x), 13);
            L.marker([firstResult.y, firstResult.x])
              .addTo(this.map!)
              .bindPopup(firstResult.label)
              .openPopup();
          }
        })
    }
  }

  search(newCompleteEvent: AutoCompleteCompleteEvent): void {
    this.filteredCountries =
      this.countries.filter(country => country.name.common.toLowerCase().startsWith(newCompleteEvent.query))
  }

  protected readonly filter = filter;
}
