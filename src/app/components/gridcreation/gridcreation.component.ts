import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gridcreation',
  templateUrl: './gridcreation.component.html',
  styleUrls: ['./gridcreation.component.scss']
})
export class GridcreationComponent implements OnInit {
  gridForm: FormGroup;

  tablearr = [];
  obstacles = [];
  tableHeaders = [];

  showtable = false;
  tableHeight = 0;
  tableWidth = 0;

  grid = {
    rows: 0,
    columns: 0,
    obstructions: 0
  }

  cRow = 0;
  colRight = 0;
  colLeft = 0;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.gridForm = new FormGroup({
      rowvalue: new FormControl(5),
      columnvalue: new FormControl(5),
      obstructionvalue: new FormControl(5)
    });
  }

  onSubmit() {
    this.reset();

    if (this.gridForm.valid) {
      this.grid['rows'] = this.gridForm.value['rowvalue'];
      this.grid['columns'] = this.gridForm.value['columnvalue'];
      this.grid['obstructions'] = this.gridForm.value['obstructionvalue'];
      console.table(this.grid);

      for (let o = 0; o < this.grid.obstructions; o++) {
        this.obstacles.push({ id: 'obst' + o });
      }


      for (let r = 0; r < this.grid.rows; r++) {
        const elem = [];

        for (let c = 0; c < this.grid.columns; c++) {
          elem.push({ id: 'row' + r + '_' + 'col' + c });
        }

        this.tablearr.push(elem);
      }

      for (let h = 0; h < this.grid.columns; h++) {
        this.tableHeaders.push({ id: 'col' + h });
      }

      this.tableHeight = this.grid['rows'] * 100;
      this.tableWidth = this.grid['columns'] * 100;

      this.showtable = true;

    }
  }

  allowDrop(ev: any) {
    ev.preventDefault();
  }

  drag(ev: any) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev: any) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }


  reset() {
    this.showtable = !this.showtable;

    this.tablearr.length = 0;
    this.obstacles.length = 0;
    this.tableHeaders.length = 0; 
    this.grid = {
      rows: 0,
      columns: 0,
      obstructions: 0
    }
  }

  start() { }


  startFlow(idx: number) {
    document.getElementById("header-" + idx);

    let table = document.getElementById('tablesimulator') as HTMLTableElement;
    let row = table.rows[idx];
    let cell = row.cells[idx];
    this.colRight = idx;
    this.colLeft = idx;

    for (let r = 0, n = table.rows.length; r < n; r++) {
      
        this.cRow = r;
        this.addFlowdirectionRight(table, this.cRow);
        this.addFlowdirectionRightMissed(table, this.cRow);

        this.addFlowdirectionLeft(table, this.cRow);
        this.addFlowdirectionLeftMissed(table, this.cRow);      
      
    }
  }

  

  addFlowdirectionRight(table: any, cRow: any) {
    let elem = table.rows[cRow].cells[this.colRight];
    let children = elem.getElementsByTagName('div');

    if (children.length == 1) {
      this.addFlow(children[0], true);      
    }

    if (children.length == 2) {
      cRow = cRow - 1;
      this.colRight++;      
      this.addFlow(children[0], false);

      this.addFlowdirectionLeft(table, cRow);
      this.addFlowdirectionRight(table, cRow);
    }
  }

  addFlowdirectionRightMissed(table: any, cRow: any) {
    let elem = table.rows[cRow].cells[this.colRight];
    let children = elem.getElementsByTagName('div');

    if (children.length == 1) {
      this.addFlow(children[0], true);
    }
    if (children.length == 2) {
      this.addFlow(children[0], false);
    }
  }

  addFlowdirectionLeft(table: any, cRow: any) {
    let elem = table.rows[cRow].cells[this.colLeft];
    let children = elem.getElementsByTagName('div');

    if (children.length == 1) {
      this.addFlow(children[0], true);
    }
    if (children.length == 2) {
      cRow = cRow - 1;
      this.colLeft--;
      this.addFlow(children[0], false);
      this.addFlowdirectionLeft(table, cRow);
    }
  }

  addFlowdirectionLeftMissed(table: any, cRow: any) {
    let elem = table.rows[cRow].cells[this.colLeft];
    let children = elem.getElementsByTagName('div');

    if (children.length == 1) {
      this.addFlow(children[0], true);
    }
  }

  addFlow(el: any, add: boolean) {
    if (add) {
      el.classList.add("flowsimulator");
    } else {
      el.classList.remove("flowsimulator");
    }
  }




}
