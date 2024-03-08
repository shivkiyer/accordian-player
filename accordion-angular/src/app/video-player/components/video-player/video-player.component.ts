import { OnInit, Component, HostListener, Input } from '@angular/core';

import { getVideoPlayerStyle } from '../../common/utils/video-utils';

/**
 * Generates a container for the video player
 *
 * @param {number} width The width of the container (optional)
 * @param {number} height The height of the container (optional)
 * @returns A container for the video and controls
 *
 * @example
 * Without any inputs, container adjusts to browser window
 * <app-video-player></app-video-player>
 *
 * @example
 * With only width, container has fixed width and
 * aspect ratio of 16:9
 * <app-video-player [width]="300"></app-video-player>
 *
 * @example
 * With only height, container has fixed width and
 * aspect ratio of 16:9
 * <app-video-player [height]="300"></app-video-player>
 *
 */
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
})
export class VideoPlayerComponent implements OnInit {
  @Input() width: number = 0;
  @Input() height: number = 0;
  videoStyle: any;

  constructor() {}

  ngOnInit(): void {
    this.setVideoDimensions();
  }

  setVideoDimensions(): void {
    const playerStyle = getVideoPlayerStyle(
      this.width,
      this.height,
      window.innerWidth,
      window.innerHeight
    );
    this.videoStyle = {
      height: `${playerStyle.playerHeight}px`,
      width: `${playerStyle.playerWidth}px`,
      marginTop: `${playerStyle.playerMarginTop}px`,
    };
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setVideoDimensions();
  }
}
