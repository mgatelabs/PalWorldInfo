import { Component, OnInit } from '@angular/core';
import { PalData } from '../pal-data';
import { PalsService } from '../pals.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {takeUntil} from 'rxjs/operators';
import { PalInfo } from '../pal-info';

@Component({
  selector: 'app-my-pals',
  templateUrl: './my-pals.component.html',
  styleUrls: ['./my-pals.component.css']
})
export class MyPalsComponent implements OnInit {
  palData: PalData = new PalData();

  numberOfColumns: number = 4;

  constructor(private palsService: PalsService, breakpointObserver: BreakpointObserver) {

    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ]).subscribe(result => {
      if (result.matches) {
        this.numberOfColumns = 1;
      }
    });

    breakpointObserver.observe([
      Breakpoints.Medium
    ]).subscribe(result => {
      if (result.matches) {
        this.numberOfColumns = 2;
      }
    });

    breakpointObserver.observe([
      Breakpoints.Large
    ]).subscribe(result => {
      if (result.matches) {
        this.numberOfColumns = 4;
      }
    });

    breakpointObserver.observe([
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.matches) {
        this.numberOfColumns = 6;
      }
    });

  }

  ngOnInit(): void {
    this.palsService.getCombinedData().subscribe(data => {
      this.palData = data;
    });
  }

  flipCheckboxChange(item: PalInfo): void {
    item.owned = !item.owned;
    this.palData.saveOwnedSet();
  }

  onCheckboxChange(item: any): void {
    //console.log(`Checkbox value changed for ${item.palName}. Checked: ${item.owned}`);
    // You can perform additional actions based on the checkbox change here

    this.palData.saveOwnedSet();

  }

  getImageClassFor(palInfo: PalInfo) {
    return !palInfo.owned ? "washed" : "";
  }

}
