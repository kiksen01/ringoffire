import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a Jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'Choose a mate and play the Thumb-game with your Mate. If you win you can stop drinking.. else.. DRINK UP' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'Tell someone you pick a riddle and if he cant solve it, he needs to drink! If he solves it hes free to go' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];
  title: string | undefined;
  description:string | undefined;
  @Input() card: string | undefined;
  game: Game = new Game();
  @Input() noCardPlayed: boolean = true;

  ngOnInit(): void{
  }
  
  ngOnChanges(): void{
    if(this.card){
      this.noCardPlayed = false;
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
