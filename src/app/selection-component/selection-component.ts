import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-selection-component',
  standalone: false,
  templateUrl: './selection-component.html',
  styleUrl: './selection-component.css',
})
export class SelectionComponent {
  
  form!: FormGroup;

  teams = [
    { id: 6,   name: 'Brasil',    logo: 'https://media.api-sports.io/football/teams/6.png' },
    { id: 9,   name: 'Espanha',   logo: 'https://media.api-sports.io/football/teams/9.png' },
    { id: 10,  name: 'Argentina', logo: 'https://media.api-sports.io/football/teams/10.png' },
    { id: 505, name: 'Alemanha',  logo: 'https://media.api-sports.io/football/teams/25.png' },
  ]

  team1Logo: string | null = null;
  team2Logo: string | null = null;

  ngOnInit() {
    this.form = new FormGroup({
      team1: new FormControl('', Validators.required),
      team2: new FormControl('', Validators.required),
    });

     this.form.get('team1')!.valueChanges.subscribe(val => {
      const found = this.teams.find(t => t.name === val);
      this.team1Logo = found ? found.logo : null;
    });

    this.form.get('team2')!.valueChanges.subscribe(val => {
      const found = this.teams.find(t => t.name === val);
      this.team2Logo = found ? found.logo : null;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Seleções escolhidas:', this.form.value);

    }
  }
    
}
