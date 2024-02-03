import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PalsService {

  private combinedData$: Observable<any> | undefined;

  constructor(private http: HttpClient) { }

  getCombinedData(): Observable<any> {
    if (!this.combinedData$) {
      const palsData$ = this.loadData('assets/pals.json');
      const breedingData$ = this.loadData('assets/breeding.json');

      this.combinedData$ = forkJoin([palsData$, breedingData$]).pipe(
        map(([palsData, breedingData]) => {
          // Process the data as needed
          const result = {
            pals: palsData,
            breeding: breedingData,
            // Add additional processing here if required
          };
          return result;
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