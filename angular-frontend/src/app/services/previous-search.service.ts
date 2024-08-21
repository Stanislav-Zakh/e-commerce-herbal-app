import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreviousSearchService {

  public lastSearch: PreservedSearchState = {
    recentMessage: false,
    previousURL: "empty",
    currentURL: "empty",
    pageNumber: 1
  };

  constructor(private router : Router) {
    this.lastSearch.currentURL = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.lastSearch.previousURL = this.lastSearch.currentURL;
        this.lastSearch.currentURL = event.url;
      };
    });
  }
}


interface PreservedSearchState {
  recentMessage: boolean;
  previousURL: string;
  currentURL: string;
  pageNumber: number;
}
