import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { VideoPlayerComponent } from './video-player/components/video-player/video-player.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    VideoPlayerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'accordion-angular';
}
