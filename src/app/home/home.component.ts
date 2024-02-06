import { Component, OnInit } from '@angular/core';
import { PalData } from '../pal-data';
import { PalsService } from '../pals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  palData: PalData = new PalData();

  constructor(private palsService: PalsService) {

  }

  ngOnInit(): void {
    this.palsService.getCombinedData().subscribe(data => {
      this.palData = data;
    });
  }
}
