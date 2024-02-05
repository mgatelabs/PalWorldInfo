import { Component } from '@angular/core';
import { PalsService } from '../pals.service';
import * as shape from 'd3-shape';
import { D3ForceDirectedLayout, Node, Edge, Layout, DagreLayout, ColaForceDirectedLayout, DagreClusterLayout, DagreNodesOnlyLayout } from '@swimlane/ngx-graph';
import { PalData } from '../pal-data';
import { Subject } from 'rxjs';
import { PalInfo } from '../pal-info';

export class NextPalNode {
  constructor(public pal: PalInfo, public nodeName: string) {

  }
}

@Component({
  selector: 'app-overall-panel',
  templateUrl: './overall-panel.component.html',
  styleUrls: ['./overall-panel.component.css']
})
export class OverallPanelComponent {

  palData: PalData = new PalData();

  public nodes: Node[] = [];
  public links: Edge[] = [];
  public layoutSettings = {
    orientation: 'TB'
  };
  public curve: any = shape.curveLinear;
  //public layout: Layout = new DagreLayout();
  public layout: Layout = new ColaForceDirectedLayout();
  update$: Subject<boolean> = new Subject();

  constructor(private palsService: PalsService) {

  }

  ngOnInit(): void {
    this.palsService.getCombinedData().subscribe(data => {
      this.palData = data;
      //this.generatePossibleParents("53");
    });
  }
/*
  public generatePossibleParents(palId: string) {
    this.nodes = [];
    this.links = [];

    const startingPal = this.palData.getPalById(palId);

    let found: Set<string> = new Set();
    let foundParent: Set<string> = new Set();

    let next: NextPalNode[] = [];
    let current: NextPalNode[] = [];

    this.nodes.push(
      {
        id: 'ROOT',
        label: startingPal.palName,
        data: {
          role: 0,
          iconPath: "./assets/images/pals/pal" + startingPal.palId + ".png"
        }
      }
    );

    next.push(new NextPalNode(startingPal, 'ROOT'));

    let recursionLoop = 0;

    let parentNodeIndex = 0;

    while (next.length > 0) {

      if (recursionLoop > 2) {
        break;
      }

      recursionLoop = recursionLoop + 1;

      current = next;
      next = [];

      let outerLoop = 0;
      let innerLoop = 0;

      console.log('Loop ' + recursionLoop + " - " + current.length);

      for (let myRoot of current) {

        if (outerLoop > 12) {
          //break;
        }
        outerLoop = outerLoop + 1;

        let myPal = myRoot.pal;
        for (let [key, value] of myPal.parents) {


          if (innerLoop > 12) {
            //break;
          }
          innerLoop = innerLoop + 1;

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

          let combined = parentA.palId + "_" + parentB.palId + "_" + myRoot.pal.palId;

          if (found.has(combined)) {
            continue;
          }

          let combinedNodeId = "N" + recursionLoop + "CN_" + parentNodeIndex;
          let leftNodeId = "N" + recursionLoop + "LN_" + parentNodeIndex;
          let rightNodeId = "N" + recursionLoop + "RN_" + parentNodeIndex;

          let toParentEdge = "E" + recursionLoop + "PE_" + (parentNodeIndex);
          let toLeftParentEdge = "E" + recursionLoop + "LE_" + parentNodeIndex;
          let toRightParentEdge = "E" + recursionLoop + "RE_" + parentNodeIndex;

          parentNodeIndex++;

          if (parentNodeIndex > 250) {
            break;
          }

          found.add(combined);

          this.nodes.push(
            {
              id: combinedNodeId,
              label: "Parent L" + recursionLoop,
              data: {
                role: 1,
                iconPath: "./assets/images/eggs/Common_Egg.png"
              }
            }
          );

          this.nodes.push(
            {
              id: leftNodeId,
              label: parentA.palName,
              data: {
                role: 2,
                iconPath: "./assets/images/pals/pal" + parentA.palId + ".png"
              }
            }
          );

          this.nodes.push(
            {
              id: rightNodeId,
              label: parentB.palName,
              data: {
                role: 2,
                iconPath: "./assets/images/pals/pal" + parentB.palId + ".png"
              }
            }
          );

          if (!foundParent.has(parentA.palId)) {
            foundParent.add(parentA.palId);
            next.push(new NextPalNode(parentA, leftNodeId));
          }

          if (!foundParent.has(parentB.palId)) {
            foundParent.add(parentB.palId);
            next.push(new NextPalNode(parentB, rightNodeId));
          }

          this.links.push({
            id: toParentEdge,
            source: myRoot.nodeName,
            target: combinedNodeId
          });

          this.links.push({
            id: toLeftParentEdge,
            source: combinedNodeId,
            target: leftNodeId
          });

          this.links.push({
            id: toRightParentEdge,
            source: combinedNodeId,
            target: rightNodeId
          });
        }
      }
    }


    this.update$.next(true);
    console.log('Fired');
  }
  */
  public getStyles(node: Node): any {

    if (node.data.role === 0) {
      return {
        'background-color': '#f5f576'
      };
    }

    return {
      'background-color': 'lightblue'
    };
  }

}
