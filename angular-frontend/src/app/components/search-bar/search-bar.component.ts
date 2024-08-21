import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  constructor(private router: Router ) {

  }

  searchKeyword(keyword: string): void {
    console.log(keyword);
    if (keyword.trim().length > 0) {
    this.router.navigateByUrl(`/search/${keyword}`);
    }
  }

}
