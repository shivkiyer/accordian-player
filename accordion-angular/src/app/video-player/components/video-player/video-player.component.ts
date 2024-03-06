import { OnInit, Component, HostListener, Input } from '@angular/core';

import { AppConstants } from '../../common/constants';

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
    const playerStyle = this.generateVideoStyle(
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

  generateVideoStyle(
    inpWidth: number,
    inpHeight: number,
    maxWidth: number,
    maxHeight: number
  ): any {
    let width, height;
    let playerWidth, playerHeight, playerMarginTop: number;
    const coverageArea = 0.9;

    if (inpWidth > 0) {
      width = inpWidth;
      height = width * AppConstants.VIDEO_ASPECT_RATIO;
    } else if (inpHeight > 0) {
      height = inpHeight;
      width = height / AppConstants.VIDEO_ASPECT_RATIO;
    } else {
      width = maxWidth;
      height = maxHeight;
    }

    playerWidth = coverageArea * width;
    if (playerWidth > AppConstants.MAX_VIDEO_WIDTH) {
      playerWidth = AppConstants.MAX_VIDEO_WIDTH;
    }
    playerHeight = playerWidth * AppConstants.VIDEO_ASPECT_RATIO;
    if (playerHeight > height) {
      playerHeight = coverageArea * height;
      playerWidth = playerHeight / AppConstants.VIDEO_ASPECT_RATIO;
    }
    playerMarginTop = (height - playerHeight) / 2.0;

    return {
      playerHeight,
      playerWidth,
      playerMarginTop
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setVideoDimensions();
  }
}
