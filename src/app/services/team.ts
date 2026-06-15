import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface Player {
  id: number;
  name: string;
  photo: string;
}

export interface PlacedPlayer {
  player: Player;
  team: 1 | 2;
  xPercent: number;
  yPercent: number;
}

export interface JogadorPosicionado {
  playerId: number;
  playerName: string;
  playerPhoto: string;
  teamNumber: 1 | 2;
  posX: number;
  posY: number;
}

export interface QuadroTaticoRequest {
  team1Id: number;
  team1Name: string;
  team1Logo: string;
  team2Id: number;
  team2Name: string;
  team2Logo: string;
  jogadores: JogadorPosicionado[];
}

export interface QuadroTaticoResponse extends QuadroTaticoRequest {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/teams`);
  }

  getSquad(teamId: number): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/teams/${teamId}/squad`);
  }

  getFlagUrl(teamName: string): string {
  const flags: { [key: string]: string } = {
    'Brazil': 'br', 'France': 'fr', 'Argentina': 'ar',
    'Germany': 'de', 'Spain': 'es', 'Portugal': 'pt',
    'England': 'gb-eng', 'Netherlands': 'nl', 'Belgium': 'be',
    'Croatia': 'hr', 'Morocco': 'ma', 'Senegal': 'sn',
    'Japan': 'jp', 'South Korea': 'kr', 'Australia': 'au',
    'USA': 'us', 'Mexico': 'mx', 'Ecuador': 'ec',
    'Uruguay': 'uy', 'Switzerland': 'ch', 'Denmark': 'dk',
    'Poland': 'pl', 'Tunisia': 'tn', 'Cameroon': 'cm',
    'Ghana': 'gh', 'Serbia': 'rs', 'Wales': 'gb-wls',
    'Canada': 'ca', 'Costa Rica': 'cr', 'Qatar': 'qa',
    'Saudi Arabia': 'sa', 'Iran': 'ir'
  };
  const code = flags[teamName];
    return code ? `https://flagcdn.com/w160/${code}.png` : '';
  }

  saveQuadro(quadro: QuadroTaticoRequest): Observable<QuadroTaticoResponse> {
    return this.http.post<QuadroTaticoResponse>(`${this.apiUrl}/quadros`, quadro);
  }

  getQuadros(): Observable<QuadroTaticoResponse[]> {
    return this.http.get<QuadroTaticoResponse[]>(`${this.apiUrl}/quadros`);
  }

  getQuadroById(id: number): Observable<QuadroTaticoResponse> {
    return this.http.get<QuadroTaticoResponse>(`${this.apiUrl}/quadros/${id}`);
  }
}