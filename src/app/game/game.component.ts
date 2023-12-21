import { Component, Input, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc, query, where, orderBy, limit, docSnapshots, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { concatAll } from 'rxjs';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameId: string = '';
  firestore: Firestore = inject(Firestore);
  constructor(public dialog: MatDialog, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getSingleDocUpdate(params['id']);
      this.gameId = params['id'];
    })
  }

  newGame() {
    this.game = new Game();
  }

  getSingleDocUpdate(id: string) {
    return onSnapshot(this.getSingleDocRef('games', id), (game: any) => {
      console.log('Game Update', game.data());
      this.game.currentPlayer = game.data().currentPlayer;
      this.game.playedCards = game.data().playedCards;
      this.game.players = game.data().players;
      this.game.stack = game.data().stack;
      this.game.pickCardAnimation = game.data().pickCardAnimation;
      if (this.game.currentCard !== undefined) { this.game.currentCard = game.data().currentCard; } else { return; }
    });
  }

  getSingleDocRef(colId: string, docId: string) {
    let data = doc(collection(this.firestore, colId), docId);
    return data;
  }
  getColRef() {
    return collection(this.firestore, 'games');
  }

  getDocRef(id: string) {
    return doc(this.firestore, 'games', id);
  }

  getAllGameDocs() {
    const collRef = collection(this.firestore, 'games');
    const postData = collectionData(collRef);
    postData.subscribe((post) => {
      console.log('All Game Docs', post);
    })
    return postData;
  }

  game: Game = new Game();
  takeCard() {
    if (!this.game.pickCardAnimation) {
      if (this.game.players.length < 2) { this.openDialog(); }
      else {
        if (this.game.stack.length === 0) { this.endGame(); }
        else {
          this.nextRound();
          setTimeout(() => { this.waitForAnimation(); }, 1100);
        }
      }
    }
  }

  waitForAnimation() {
    if (this.game.currentCard !== undefined) { this.game.playedCards.push(this.game.currentCard) } else return;
    this.game.pickCardAnimation = false;
    this.saveGame();
  }

  nextRound() {
    this.game.currentCard = this.game.stack.pop()!;
    this.game.pickCardAnimation = true;
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();
  }
  endGame() {
    this.game.emptyCardStack = true;
    this.saveGame();
  }
  openDialog(): void {
    if (this.game.players.length < 8) {
      const dialogRef = this.dialog.open(DialogAddPlayerComponent);
      dialogRef.afterClosed().subscribe((name: string) => {
        if (name && name.length > 0) {
          this.game.players.push(name);
          this.saveGame();
        }
      });
    } else { return; }
  }

  saveGame() {
    if (this.gameId && this.game.stack.length > 0) {
      const savedGame = this.getDocRef(this.gameId);
      updateDoc(savedGame, this.game.toJson());
    }
    else return;
  }
}

