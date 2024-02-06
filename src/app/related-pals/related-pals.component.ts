import { Component, OnInit, booleanAttribute } from '@angular/core';
import { PalData } from '../pal-data';
import { PalsService } from '../pals.service';
import { PalInfo } from '../pal-info';
import { PalPair } from '../pal-pair';

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

  palSource: string = "all";
  palLimit: string = '10';

  results: RelatedNodeLink[] = [];

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
    if (this.parentA.length > 0 || this.parentB.length > 0 && this.child.length > 0) {

      let parent1Id = '';
      let parent2Id = '';

      if (this.parentA.length > 0 && this.parentB.length > 0) {
        parent1Id = this.parentA;
        parent2Id = this.parentB;
      } else if (this.parentA.length > 0) {
        parent1Id = this.parentA;
        parent2Id = this.parentA;
      } else if (this.parentB.length > 0) {
        parent1Id = this.parentB;
        parent2Id = this.parentB;
      }


      let parentA = this.palData.getPalById(parent1Id);
      let parentB = this.palData.getPalById(parent2Id);
      let hasTwoParents: boolean = parentA.palId !== parentB.palId;
      let child = this.palData.getPalById(this.child);

      let limit = parseInt(this.palLimit);

      let myPalsOnly: boolean = this.palSource === 'my';

      let exploredParents = new Set<string>();
      let currentList: RelatedNodeLink[] = [];
      let nextList: RelatedNodeLink[] = [];
      
      let results: RelatedNodeLink[] = [];

      nextList.push({paths:[], pal: child, foundA: false, foundB: false});
      //exploredParents.add(child.palId);

      let primaryLoop = 0;

      let rowLimitHit: boolean = false;

      while (nextList.length > 0) {
        currentList = nextList;
        nextList = [];
        for (let item of currentList) {

          if (rowLimitHit) break;

          for (let parentPair of item.pal.parents) {

            if (rowLimitHit) break;

            if (myPalsOnly && (!parentPair.a.owned || !parentPair.b.owned)) {
              continue;
            }

            let parent1Match = parentPair.a.palId === parentA.palId || parentPair.b.palId === parentA.palId;
            let parent2Match = hasTwoParents && parentPair.a.palId === parentB.palId || parentPair.b.palId === parentB.palId;


            if (parent1Match || parent2Match) {
              let tempNode: RelatedNodeLink = {
                paths: [...item.paths],
                pal: parentPair.a,
                foundA: parent1Match || item.foundA,
                foundB: parent2Match || item.foundB,
              };
              tempNode.paths.push(parentPair);
              if (hasTwoParents && tempNode.foundA && tempNode.foundB) {                
                results.push(tempNode);
                continue;
              } else if (!hasTwoParents && tempNode.foundA) {
                results.push(tempNode);
              }

              if (results.length >= limit) {
                rowLimitHit = true;
                break;
              }
            }

            if (!exploredParents.has(parentPair.a.palId)) {
              exploredParents.add(parentPair.a.palId);
              let nextNode: RelatedNodeLink = {
                paths: [...item.paths],
                pal: parentPair.a,
                foundA: false || item.foundA || parent1Match,
                foundB: false || item.foundB || parent2Match,
              };
              nextNode.paths.push(parentPair);
              nextList.push(nextNode);
            }
            if (!exploredParents.has(parentPair.b.palId)) {
              exploredParents.add(parentPair.b.palId);
              let nextNode: RelatedNodeLink = {
                paths: [...item.paths],
                pal: parentPair.b,
                foundA: false || item.foundA || parent1Match,
                foundB: false || item.foundB || parent2Match,
              };
              nextNode.paths.push(parentPair);
              nextList.push(nextNode);
            }
          }
        }
      }

      this.results = results;
    }
  }

  getStyleForPal(palId: string) {
    if (palId === this.parentA || palId === this.parentB) {
      return 'bold';
    }
    return 'normal';
  }

}

interface RelatedNodeLink {
  paths:PalPair[];
  pal: PalInfo;
  foundA: boolean;
  foundB: boolean;
}