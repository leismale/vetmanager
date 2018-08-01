
import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridType} from 'angular-gridster2'
@Component({
  selector: "app-reception",
  templateUrl: "./reception.component.html",
  styleUrls: ["./reception.component.css"],
  encapsulation: ViewEncapsulation.None
})
  export class ReceptionComponent implements OnInit {
    options: GridsterConfig;
    dashboard: Array<GridsterItem>;
  
    ngOnInit() {
      this.options = {
        gridType: GridType.Fit,
        compactType: CompactType.None,
        margin: 10,
        outerMargin: true,
        outerMarginTop: null,
        outerMarginRight: null,
        outerMarginBottom: null,
        outerMarginLeft: null,
        mobileBreakpoint: 640,
        minCols: 1,
        maxCols: 100,
        minRows: 1,
        maxRows: 100,
        maxItemCols: 100,
        minItemCols: 1,
        maxItemRows: 100,
        minItemRows: 1,
        maxItemArea: 2500,
        minItemArea: 1,
        defaultItemCols: 1,
        defaultItemRows: 1,
        fixedColWidth: 105,
        fixedRowHeight: 105,
        keepFixedHeightInMobile: false,
        keepFixedWidthInMobile: false,
        scrollSensitivity: 10,
        scrollSpeed: 20,
        enableEmptyCellClick: false,
        enableEmptyCellContextMenu: false,
        enableEmptyCellDrop: false,
        enableEmptyCellDrag: false,
        emptyCellDragMaxCols: 50,
        emptyCellDragMaxRows: 50,
        ignoreMarginInRow: false,
        draggable: {
          enabled: true,
        },
        resizable: {
          enabled: true,
        },
        swap: false,
        pushItems: true,
        disablePushOnDrag: false,
        disablePushOnResize: false,
        pushDirections: {north: true, east: true, south: true, west: true},
        pushResizeItems: false,
        disableWindowResize: false,
        disableWarnings: false,
        scrollToNewItems: false
      };
  
      this.dashboard = [
        {cols: 2, rows: 1, y: 0, x: 0},
        {cols: 2, rows: 2, y: 0, x: 2}
        /*  {cols: 2, rows: 2, y: 0, x: 0, hasContent: true, minItemRows: 2, minItemCols: 2, label: 'Min rows & cols = 2'},
        {cols: 2, rows: 2, y: 3, x: 5, minItemRows: 2, minItemCols: 2, label: 'Min rows & cols = 2'},
        {cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2'},
        {cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled'},
        {cols: 1, rows: 1, y: 2, x: 4, dragEnabled: false, resizeEnabled: false, label: 'Drag&Resize Disabled'}, */
      ];
    }
  
    changedOptions() {
      if (this.options.api && this.options.api.optionsChanged) {
        this.options.api.optionsChanged();
      }
    }
/*   
    removeItem($event, item) {
      $event.preventDefault();
      $event.stopPropagation();
      this.dashboard.splice(this.dashboard.indexOf(item), 1);
    }
  
    addItem() {
      this.dashboard.push({x: 0, y: 0, cols: 1, rows: 1});
    } */
  }
  