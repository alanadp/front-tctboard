import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService, Team, Player } from '../services/team';

@Component({
  selector: 'app-board-component',
  standalone: false,
  templateUrl: './board-component.html',
  styleUrl: './board-component.css',
})
export class BoardComponent implements OnInit {

  team1!: Team;
  team2!: Team;
  players1: Player[] = [];
  players2: Player[] = [];

  constructor(public router: Router, public teamService: TeamService)  {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { team1: Team, team2: Team };
    if (state) {
      this.team1 = state.team1;
      this.team2 = state.team2;
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.teamService.getSquad(this.team1.id).subscribe(data => {
      this.players1 = data;
    });
    this.teamService.getSquad(this.team2.id).subscribe(data => {
      this.players2 = data;
    });
  }
}