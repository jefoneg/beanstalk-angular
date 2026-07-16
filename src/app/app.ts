import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/child-component/navbar-component/navbar-component';
import { Loader } from './component/loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, Loader],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {}
