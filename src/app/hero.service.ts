import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Hero } from './Hero';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  baseUrl = environment.dbApiURL;

  hero: Hero;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.baseUrl);
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/${id}`);
  }

  updateHero(hero: Hero): Observable<Hero> {
    console.log('update');
    return this.http.put<Hero>(`${this.baseUrl}/${hero.id}`, hero);
  }

  deleteHero(hero: Hero): Observable<Hero> {
    return this.http.delete<Hero>(`${this.baseUrl}/${hero.id}`);
  }
}
