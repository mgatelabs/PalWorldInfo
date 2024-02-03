import { Component } from '@angular/core';
import { PalsService } from '../pals.service';
import * as shape from 'd3-shape';
import { D3ForceDirectedLayout, Node, Edge, Layout } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-overall-panel',
  templateUrl: './overall-panel.component.html',
  styleUrls: ['./overall-panel.component.css']
})
export class OverallPanelComponent {

  pals: any = {};
  breedingInfo: any = {};

  public nodes: Node[] = [];
  public links: Edge[] = [];
  public layoutSettings = {
    orientation: 'TB'
  };
  public curve: any = shape.curveLinear;
  public layout: Layout = new D3ForceDirectedLayout();

  constructor(private palsService: PalsService) {}

  ngOnInit(): void {
    this.palsService.getPals().subscribe(data => {
      this.pals = data;
    });

    this.palsService.getBreedingInfo().subscribe(data => {
      this.breedingInfo = data;
    });
  }

}
