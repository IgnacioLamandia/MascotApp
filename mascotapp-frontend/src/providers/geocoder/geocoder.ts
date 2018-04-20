import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class GeoCoderProvider {
	API_KEY: string;
  API_POSITION_URL: string;
  API_ADDRESS_URL:string;
  
  constructor(public http: Http) {
  	this.API_KEY = `AIzaSyCyJB4s6e36bnzcGKTWvGYryM-jaxdbn0M`;
    this.API_POSITION_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.API_KEY}&address=`;
    this.API_ADDRESS_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.API_KEY}&latlng=`;
  }

  getPositionFromAddress(address: string, postalCode?: string, place?: string, province?: string, region?: string, country?: string): Observable<any> {
        let compositeAddress = [address];
        if (postalCode) compositeAddress.push(postalCode);
        if (place) compositeAddress.push(place);
        if (province) compositeAddress.push(province);
        if (region) compositeAddress.push(region);
        if (country) compositeAddress.push(country);
        let url = `${this.API_POSITION_URL}${compositeAddress.join(',')}`;
        return this.http.get(url).map(response => <any> response.json());
    }

    getAddressFromPosition(lat:number, lon:number){
    	let url = `${this.API_ADDRESS_URL}${lat},${lon}&sensor=false`;
    	return this.http.get(url).map(response => <any> response.json());
    }
}
