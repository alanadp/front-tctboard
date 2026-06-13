import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OperatorFunction, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { TeamService, Team } from '../services/team';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection-component',
  standalone: false,
  templateUrl: './selection-component.html',
  styleUrl: './selection-component.css',
})
export class SelectionComponent implements OnInit {

  form!: FormGroup;
  teams: Team[] = [];

  team1Selected: Team | null = null;
  team2Selected: Team | null = null;

  constructor(public teamService: TeamService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      team1: new FormControl('', Validators.required),
      team2: new FormControl('', Validators.required),
    });

    this.teamService.getTeams().subscribe(data => {
      this.teams = data;
    });
  }

  search: OperatorFunction<string, Team[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1 ? [] :
        this.teams.filter(t =>
          t.name.toLowerCase().includes(term.toLowerCase())
        )
      )
    );

  formatter = (t: Team) => t.name;

  onTeam1Select(event: any) {
    this.team1Selected = event.item;
    this.form.get('team1')!.setValue(event.item);
  }

  onTeam2Select(event: any) {
    this.team2Selected = event.item;
    this.form.get('team2')!.setValue(event.item);
  }

  onSubmit() {
  if (this.team1Selected && this.team2Selected) {
    this.router.navigate(['/board'], {
        state: {
          team1: this.team1Selected,
          team2: this.team2Selected
        }
      });
    }
  }
}