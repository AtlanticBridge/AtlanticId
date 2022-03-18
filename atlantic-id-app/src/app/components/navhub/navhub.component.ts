import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navhub',
  templateUrl: './navhub.component.html',
  styleUrls: ['./navhub.component.scss']
})
export class NavhubComponent implements OnInit {

  @Input() showNav = '';
  @Output() turnOffEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  emitTurnOff(value:boolean) {
    this.turnOffEvent.emit(value);
  }

}
