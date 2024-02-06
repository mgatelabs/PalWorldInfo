import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { OverallPanelComponent } from './overall-panel/overall-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageSelectComponent } from './image-select/image-select.component';
import { FormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { HomeComponent } from './home/home.component';
import { MyPalsComponent } from './my-pals/my-pals.component';
import { ParentsComponent } from './parents/parents.component';
import { CanBreedComponent } from './can-breed/can-breed.component';
import {LayoutModule} from '@angular/cdk/layout';
import { RelatedPalsComponent } from './related-pals/related-pals.component';

@NgModule({
    declarations: [
        AppComponent,
        OverallPanelComponent,
        ImageSelectComponent,
        HomeComponent,
        MyPalsComponent,
        ParentsComponent,
        CanBreedComponent,
        RelatedPalsComponent   
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxGraphModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        MatSelectModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatCheckboxModule,
        MatCardModule,
        LayoutModule,
        MatListModule
    ]
})
export class AppModule { }
