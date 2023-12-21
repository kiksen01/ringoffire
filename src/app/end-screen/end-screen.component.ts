import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameComponent } from '../game/game.component';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.scss']
})
export class EndScreenComponent {
  constructor(private router: Router, private game: GameComponent, private gameModel: Game){
    gameModel.emptyCardStack = true;
    game.saveGame();
    console.log(gameModel.emptyCardStack);
  }

  restartGame(){
    this.router.navigateByUrl('');
  }
    
}
