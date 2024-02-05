import { Component, OnInit } from '@angular/core';
import { PalData } from '../pal-data';
import { PalsService } from '../pals.service';

@Component({
  selector: 'app-my-pals',
  templateUrl: './my-pals.component.html',
  styleUrls: ['./my-pals.component.css']
})
export class MyPalsComponent implements OnInit {
  palData: PalData = new PalData();

  constructor(private palsService: PalsService) {

  }

  ngOnInit(): void {
    this.palsService.getCombinedData().subscribe(data => {
      this.palData = data;
    });
  }

  onCheckboxChange(item: any): void {
    console.log(`Checkbox value changed for ${item.palName}. Checked: ${item.owned}`);
    // You can perform additional actions based on the checkbox change here

    this.palData.saveOwnedSet();

  }

}
