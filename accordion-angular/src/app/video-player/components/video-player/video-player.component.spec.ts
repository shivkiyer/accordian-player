import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { VideoPlayerComponent } from './video-player.component';

describe('VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoPlayerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoPlayerComponent);
  });

  it('should create', () => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should adjust to width if provided as input', () => {
    component = fixture.componentInstance;
    component.width = 300;
    fixture.detectChanges();
    let videoPlayer = fixture.debugElement.query(By.css('.video-player'));
    expect(videoPlayer.styles['width']).toBe('270px');
  });

  it('should ajust to width if both width and height are provided as inputs', () => {
    component = fixture.componentInstance;
    component.width = 300;
    component.height = 300;
    fixture.detectChanges();
    let videoPlayer = fixture.debugElement.query(By.css('.video-player'));
    expect(videoPlayer.styles['width']).toBe('270px');
  });

  it('should ajust to height if only height is provided as input', () => {
    component = fixture.componentInstance;
    component.height = 300;
    fixture.detectChanges();
    let videoPlayer = fixture.debugElement.query(By.css('.video-player'));
    expect(videoPlayer.styles['height']).toBe('270px');
  });
});
