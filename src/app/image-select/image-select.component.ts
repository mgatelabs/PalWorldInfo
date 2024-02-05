import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PalData } from '../pal-data';

@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.css']
})
export class ImageSelectComponent implements OnChanges {
  @Input() palData: PalData = new PalData();
  @Input() title: string = 'undefined';
  options: Category[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['palData'] && this.palData) {
      this.generateOptions();
    }
  }

  changeClient(value: string) {
    console.log(value);
  }

  private generateOptions(): void {
    // Process this.palData and generate options
    // For example, assuming PalData has an array of items
    this.options = this.palData.pals.map(item => (
      {
      viewValue: "[" + item.palId+"]" + item.palName,
      value: item.palId,
      image: "./assets/images/pals/pal" + item.palId + ".png"
    }));
    console.log(this.options);
  }

}

interface Category {
  value: string;
  viewValue: string;
  image: string;
}