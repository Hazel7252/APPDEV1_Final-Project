import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  backgroundLoaded = false;

  ngOnInit(): void {
    this.preloadBackgroundImage();
  }

  preloadBackgroundImage(): void {
    const img = new Image();
    img.src = '/assets/images/ggs.jpg';
    img.onload = () => {
      this.backgroundLoaded = true;
    };
    img.onerror = () => {
      console.error('Failed to load background image');
      this.backgroundLoaded = true; // Still show content even if image fails
    };
  }
}