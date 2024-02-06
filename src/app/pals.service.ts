import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, shareReplay } from 'rxjs';
import { PalData } from './pal-data';

@Injectable({
  providedIn: 'root'
})
export class PalsService {

  private combinedData$: Observable<PalData> | undefined;

  constructor(private http: HttpClient) { }

  getCombinedData(): Observable<PalData> {
    if (!this.combinedData$) {
      const palsData$ = this.loadData('assets/pals.json');
      const breedingData$ = this.loadData('assets/breeding.json');

      this.combinedData$ = forkJoin([palsData$, breedingData$]).pipe(
        map(([palsData, breedingData]) => {

          const palData: PalData = new PalData();

          const palsArray: [string, string][] = Object.entries(palsData);

          console.log('Pal Database [START]');

          palsArray.forEach(([key, value]) => {
            palData.addPal(key, value);
          });

          palData.pals.sort((a, b) => {
            let sideA = (a.index * 10) + a.offset;
            let sideB = (b.index * 10) + b.offset;
            return sideA - sideB;
          });

          console.log('Pal Database [END]');

          palData.loadOwnedSet();

          console.log('Breeding Parents [START]');

          for (let firstKey in breedingData) {
            if (breedingData.hasOwnProperty(firstKey) && typeof breedingData[firstKey] === 'object') {
              for (let secondKey in breedingData[firstKey]) {
                if (breedingData[firstKey].hasOwnProperty(secondKey)) {
                  let child = palData.getPalById(breedingData[firstKey][secondKey]);
                  let parentA = palData.getPalById(firstKey);
                  let parentB = palData.getPalById(secondKey);
                  child.addParentPair(parentA, parentB);
                }
              }
            }
          }

          console.log('Breeding Parents [END]');

          return palData;
        }),
        shareReplay(1), // Cache the result for subsequent requests
        catchError(this.handleError)
      );
    }
    return this.combinedData$;
  }
  

  private loadData(url: string): Observable<any> {
    return this.http.get(url).pipe(
      map((data: any) => {
        // Additional processing if needed
        return data;
      })
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return of(null);
  }
}