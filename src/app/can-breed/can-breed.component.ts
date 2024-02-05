import { Component, OnInit } from '@angular/core';
import { PalData } from '../pal-data';
import { PalsService } from '../pals.service';
import { PalInfo } from '../pal-info';
import { zip } from 'rxjs';

@Component({
  selector: 'app-can-breed',
  templateUrl: './can-breed.component.html',
  styleUrls: ['./can-breed.component.css']
})
export class CanBreedComponent implements OnInit {

  availableChildren: PalBreeding[] = [];

  palData: PalData = new PalData();

  constructor(private palsService: PalsService) {

  }

  ngOnInit(): void {
    this.palsService.getCombinedData().subscribe(data => {
      this.palData = data;
    });
  }

  calculateBreedingPairs() {
    let tempChildren: PalBreeding[] = [];

    let found = new Set<string>();

    for (let pal of this.palData.pals) {
      if (pal.owned === false) {

        for (let [key, value] of pal.parents) {
          let parentA = this.palData.getPalById(key);
          let parentB = this.palData.getPalById(value);

          let flip = false;

          if (parentA.index == parentB.index) {
            if (parentA.offset == parentB.offset) {

            } else if (parentA.offset > parentB.offset) {
              flip = true;
            }
          } if (parentA.index > parentB.index) {
            flip = true;
          }

          if (flip) {
            let temp = parentA;
            parentA = parentB;
            parentB = temp;
          }

          if (parentA.owned === true && parentB.owned === true) {
            let key = parentA.palId + "_" + parentB.palId;
            if (!found.has(key)) {
              found.add(key);
              tempChildren.push({parentA: parentA, parentB: parentB, child: pal});
            }
          }
        }

      }
    }

    this.availableChildren = tempChildren;
  }

}

interface PalBreeding {
  parentA: PalInfo;
  parentB: PalInfo;
  child: PalInfo;
}