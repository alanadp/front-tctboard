import { Component, OnInit, ElementRef, ViewChild, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService, Team, Player, PlacedPlayer, QuadroTaticoRequest } from '../services/team';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-component',
  standalone: false,
  templateUrl: './board-component.html',
  styleUrl: './board-component.css',
})
export class BoardComponent implements OnInit {

  team1!: Team;
  team2!: Team;
  players1 = signal<Player[]>([]);
  players2 = signal<Player[]>([]);
  placedPlayers = signal<PlacedPlayer[]>([]);

  @ViewChild('campo') campoRef!: ElementRef<HTMLDivElement>;

  constructor(public router: Router, public teamService: TeamService) {
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
    this.teamService.getSquad(this.team1.id).subscribe(data => this.players1.set(data));
    this.teamService.getSquad(this.team2.id).subscribe(data => this.players2.set(data));
  }

  getPlayerPhoto(player: Player): string {
    if (!player.photo || player.photo.includes('media.api-sports.io')) {
      return 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
    }
    return player.photo;
  }

  onImgError(event: any) {
    event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
  }

  isPlaced(player: Player): boolean {
    return this.placedPlayers().some(pp => pp.player.id === player.id);
  }

  // Soltou um jogador da lateral
  onSidebarDrop(event: CdkDragEnd, player: Player, team: 1 | 2) {
    const campo = this.campoRef.nativeElement.getBoundingClientRect();
    const point = event.dropPoint;

    const dentroDoCampo =
      point.x >= campo.left && point.x <= campo.right &&
      point.y >= campo.top && point.y <= campo.bottom;

    if (dentroDoCampo && !this.isPlaced(player)) {
      const xPercent = ((point.x - campo.left) / campo.width) * 100;
      const yPercent = ((point.y - campo.top) / campo.height) * 100;

      this.placedPlayers.update(list => [...list, { player, team, xPercent, yPercent }]);
    }

    // sempre volta o item pra posição original na lateral
    event.source.reset();
  }

  // Reposicionar um jogador que já está no campo
  onFieldDrop(event: CdkDragEnd, placed: PlacedPlayer) {
    const campo = this.campoRef.nativeElement.getBoundingClientRect();
    const delta = event.distance;

    let novoX = placed.xPercent + (delta.x / campo.width) * 100;
    let novoY = placed.yPercent + (delta.y / campo.height) * 100;

    novoX = Math.min(100, Math.max(0, novoX));
    novoY = Math.min(100, Math.max(0, novoY));

    this.placedPlayers.update(list =>
      list.map(pp => pp.player.id === placed.player.id
        ? { ...pp, xPercent: novoX, yPercent: novoY }
        : pp
      )
    );

    event.source.reset();
  }

  removePlacedPlayer(placed: PlacedPlayer) {
    this.placedPlayers.update(list => list.filter(pp => pp.player.id !== placed.player.id));
  }

  salvar() {
  if (this.placedPlayers().length === 0) {
    alert('Posicione pelo menos um jogador no campo antes de salvar.');
    return;
  }

  const quadro: QuadroTaticoRequest = {
    team1Id: this.team1.id,
    team1Name: this.team1.name,
    team1Logo: this.team1.logo,
    team2Id: this.team2.id,
    team2Name: this.team2.name,
    team2Logo: this.team2.logo,
    jogadores: this.placedPlayers().map(pp => ({
      playerId: pp.player.id,
      playerName: pp.player.name,
      playerPhoto: pp.player.photo,
      teamNumber: pp.team,
      posX: pp.xPercent,
      posY: pp.yPercent
    }))
  };

  this.teamService.saveQuadro(quadro).subscribe(() => {
    alert('Quadro tático salvo com sucesso!');
    this.router.navigate(['/']);
    });
  }
}