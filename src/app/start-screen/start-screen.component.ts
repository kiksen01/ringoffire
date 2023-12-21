import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc, query, where, orderBy, limit, docSnapshots, getDoc } from '@angular/fire/firestore';
@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  game: Game;
  constructor(private router: Router, private firestore: Firestore) {
    this.game = new Game();
   }
  async newGame() {
    
    // Start Game
    await addDoc(collection(this.firestore,'games'),this.game.toJson()).then((gameInfo) =>{
      this.router.navigateByUrl('/game/' + gameInfo.id);
    })
    console.log('Game Created:',this.game);
  }
}


