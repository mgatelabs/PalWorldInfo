import { Component, OnInit } from '@angular/core';
import { PalData } from '../pal-data';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { PalsService } from '../pals.service';
import { PalInfo } from '../pal-info';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {

  availableParents: PalBreeding[] = [];

  palData: PalData = new PalData();

  numberOfColumns: number = 4;

  selectedPalId: string = "";

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

  getClassForImage(isLeft: boolean, pal:PalInfo) {
    return (isLeft ? 'grid-image-left' : 'grid-image-right') + (!pal.owned ? ' washed' : '');
  }

  getClassForFavorite(isLeft: boolean, pal:PalInfo) {
    return (isLeft ? 'left-fav' : 'right-fav') + (!pal.owned ? ' hidden' : '');
  }

  changeParentTo(palId: string) {
    this.selectedPalId = palId;
    this.showParentsFor(palId);
  }

  showParentsFor(palId: string) {
    if (palId) {
      let child = this.palData.getPalById(palId);
      let tempChildren: PalBreeding[] = [];
      let found = new Set<string>();

      console.log(child);

      for (let palPair of child.parents) {

        let parentA = palPair.a;
        let parentB = palPair.b;

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

        let key = parentA.palId + "_" + parentB.palId;
        if (!found.has(key)) {
          found.add(key);
          tempChildren.push({parentA: parentA, parentB: parentB, child: child});
        }

      }
      this.availableParents = tempChildren;
    } else {
      this.availableParents = [];
    }
  }

}

interface PalBreeding {
  parentA: PalInfo;
  parentB: PalInfo;
  child: PalInfo;
}