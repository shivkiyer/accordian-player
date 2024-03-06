import { OnInit, Component, HostListener, Input } from '@angular/core';

import { getVideoPlayerStyle } from '../../common/utils/video-utils';

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
