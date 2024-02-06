import { Component, OnInit } from '@angular/core';
import { PalData } from '../pal-data';
import { PalsService } from '../pals.service';

@Component({
  selector: 'app-related-pals',
  templateUrl: './related-pals.component.html',
  styleUrls: ['./related-pals.component.css']
})
export class RelatedPalsComponent implements OnInit {

  palData: PalData = new PalData();

  parentA: string = "";
  parentB: string = "";
  child: string = "";

  constructor(private palsService: PalsService){
    
  }

  ngOnInit(): void {
    this.palsService.getCombinedData().subscribe(data => {
      this.palData = data;
    });
  }

  selectParentA(palId: string) {
    this.parentA = palId;
  }

  selectParentB(palId: string) {
    this.parentB = palId;
  }

  selectChild(palId: string) {
    this.child = palId;
  }

  calculateRelationship() {
    // This is the minimal needed info
    if (this.parentA.length > 0 && this.child.length > 0) {
      let parentA = this.palData.getPalById(this.parentA);
      let child = this.palData.getPalById(this.child);

      


    }
  }

}
