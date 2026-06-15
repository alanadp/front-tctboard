import { Component, OnInit, signal } from '@angular/core';
import { TeamService, QuadroTaticoResponse } from '../services/team';

@Component({
  selector: 'app-meus-quadros-component',
  standalone: false,
  templateUrl: './meus-quadros-component.html',
  styleUrl: './meus-quadros-component.css',
})
export class MeusQuadrosComponent implements OnInit {

  quadros = signal<QuadroTaticoResponse[]>([]);
  quadroSelecionado = signal<QuadroTaticoResponse | null>(null);

  constructor(public teamService: TeamService) {}

  ngOnInit() {
    this.teamService.getQuadros().subscribe(data => {
      this.quadros.set(data);
    });
  }

  visualizar(quadro: QuadroTaticoResponse) {
    this.quadroSelecionado.set(quadro);
  }

  fechar() {
    this.quadroSelecionado.set(null);
  }

  getPlayerPhoto(photo: string): string {
    if (!photo || photo.includes('media.api-sports.io')) {
      return 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
    }
    return photo;
  }

  onImgError(event: any) {
    event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
  }
}