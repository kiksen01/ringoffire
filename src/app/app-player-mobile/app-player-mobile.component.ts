import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-player-mobile',
  templateUrl: './app-player-mobile.component.html',
  styleUrls: ['./app-player-mobile.component.scss']
})
export class AppPlayerMobileComponent implements OnInit {
  @Input() name: string | undefined;
  @Input() playerActive: boolean = false;

  constructor(){}
  ngOnInit(): void {
  }
}
