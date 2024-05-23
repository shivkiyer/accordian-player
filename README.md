# accordian-player
## An interactive video player

This app hosts an online video player with the usual video controls, but can also receive inputs from a user on their viewing preferences and generate a custom video playlist.

The video player can be used in any application that features significant amount of video content all of which an average user may not find interesting. Instead of losing the interest of the viewer or expecting them to fast forward the video, the accordian player provides options to the user asking them for their preferences, and according to those preferences, plays them a selected set of videos.

The creator of the videos can configure these options using a template which is then inserted into a Comma Separated Values (.csv) configuration file.

The app has been being built using React 18. The app can be inserted into any other React front-end by copying over a single directory. To extend the app or customize it in another application, react-redux is also a requirement.

## Installation

To use the app in the standalone mode:

### Install dependencies
npm install
### Run locally as a dev server
npm run start
### Create a build
npm run build-local
or
npm run build

build-local will compile the package with relative paths to the index.html file, while build will expect all static files (JS,CSS etc) to be served through a /static/ URL. Therefore, build-local is perfect for testing either through the file system or through a basic server. The build script would be more suited towards a hosting through a server configured to handle static files separately.


## Usage

The root component is the AccordionPlayer component in the accordion-player root directory within src. It takes four optional arguments - name, url, width, height. The accordion player can be called without any arguments:   
`<AccordionPlayer />`     
This will display a welcome page with an input field that accepts the URL of either the video file or a configuration file.
The accordion player can be called with a URL:   
`<AccordionPlayer url='http://some-url.com' />`     
In the case of the URL being of a single video, the component can also be called with the name argument:   
`<AccordionPlayer url='http://some-url.com' name='This text will appear in the control bar' />`    
The accordion player will asjust to the size of the window. In normal mode, it has a maximum width of 1080px and is centered. As the window size decreases below 1080px, the width of the video will be the same as the width of the video. To specify a width:   
`<AccordionPlayer url='http://some-url.com' name='This text will appear in the control bar' width='475px' />`    
Alternatively, the height can be specified:    
`<AccordionPlayer url='http://some-url.com' name='This text will appear in the control bar' height='425px' />`    
Either width or height needs to be specified, as the video aspect ratio will be 16:9, and the other dimension will be calculated.

In the case of the URL being that of a .csv configuration file, the name argument will be ignored as the names of the videos are specified in the configuration file. Before describing the configuration file, the parts of the video collection will be described.

### Introduction video
This is the first video in the collection, which can contain a short background of the company or range of products being described.

![intro](https://github.com/shivkiyer/accordion-player/assets/3229548/1dd66fd7-8fa5-4567-932b-1b6935955d75)

### Selection video
This second video in the series will allow the viewer to choose the videos that they are interested in watching. Moreover, the user can choose between a long video in case they are very interested in a product or service, or a short video if they are somewhat interested instead.

![selection](https://github.com/shivkiyer/accordion-player/assets/3229548/3b199018-9d9e-4b56-b9e2-4d6d313aa99d)

The selection video will ask the viewer to choose videos according to their preferences. The selection video continuously loops until the viewer has made their selection. Therefore, the selection video does not display the video progress bar and the viewer cannot fastforward the video. After providing the viewer with instructions to choose their videos, the selection video will display the selection table.

![selection_table](https://github.com/shivkiyer/accordion-player/assets/3229548/8aabf235-1262-4444-9011-0c61e9c569b8)

Clicking on the columns for each video indicates whether the viewer is very interested in a product, somewhat interested in a product or not interested. When the viewer had made selections for every video, they can proceed to watching the videos by clicking on the Continue button.

![selected](https://github.com/shivkiyer/accordion-player/assets/3229548/819fb438-be0a-4a93-a842-9e2c8d75728d)


### Playlist mode

Once the viewer has made their selection, the videos are played in a sequence.
![playlist](https://github.com/shivkiyer/accordion-player/assets/3229548/8a806081-5906-4ca5-b88e-89cb9b2e7761)

In this playlist mode, the viewer can watch the selected videos one after the other. Moreover, the viewer can choose to go back and forth in this collection using the icons next to the fullscreen icon. These icons are the movie reel icons and are in two sizes - the larger one for the longer videos and the smaller one for the shorter videos. As the video changes, the icons will be highlighted to indicate the video currently being played. By clicking on the icons, the viewer can watch a video again if particularly interested.

### Ending video

After watching all the videos, the viewer will arrive at a video that concludes on the presentation.

![ending](https://github.com/shivkiyer/accordion-player/assets/3229548/2f7dc758-13b4-47aa-8704-f387fb22731c)

The company can provide a quick overview of their products and also on how an interested viewer can contact them. The ending video also loops continuously similar to the selection video. To exit the presentation, the viewer can click on the video as it loops and be taken to an action URL of the company that either provides additional information or instructions on how to contact the company for sales information.


## Configuration file

The biggest selling point of the accordion player is the configuration option which enables the creator of the videos to specify a number of parameters to control the manner in which the videos are displayed. These configurations can be placed in a Comma Separated Value (.csv) file that can be created with any spreadsheet software. While saving the file as a .csv file, the creator must ensure that the separator between the columns is a comma (,). It is advisable to open the .csv file in a simple text editor like Notepad to check for the presence of commas as separators and not semicolons or any other special character.   
Once the .csv file is created, it needs to be uploaded onto a server where AJAX requests can be made. This can be an issue especially when running the accordion player in a dev server, as most servers will not allow CORS (Cross-origin Resource Sharing) by default, and therefore, the browser will be unable to access the configuration file hosted on the server. To remedy this, the server hosting the configuration file will need to respond with "Access-Control-Allow-Origin" headers.   
The URL of the configuration file will then be a parameter in the AccordionPlayer component:     
`<AccordionPlayer url='http://some-url.com/config.csv' />`      

The configuration file has a row dedicated to every part of the video series - Introduction video, Selection video, Playlist videos and Ending video. In that row, all parameters related to a particular video can be specified.   

### Introduction video

The row for the Introduction Video begins with the key word INTRO_INFO on the first column. The following parameters can be defined for the Introduction video:    

- Title of the video: The title of the introduction video can be specified with the key word INTRO_TITLE on the second column followed by the title string on the third column.
- URL of the video: The URL of the introduction video can be specified with the key word INTRO_VIDEO_URL on the fourth column following by the URL string on the fifth column.
- Frames per second: The parameter is optional but if specified will apply to all videos and not just the introduction video. If not specified, the frames per second will be assumed to be 30 frames per second which is usually the default in most video rendering software. To specify the frames per second, the key word FRAMES_PER_SECOND must be specified on the sixth column followed by a number on the seventh column.
- Poster image: This is an image that will be displayed until the browser loads the introduction video. In the case of a slow internet connection or a web browser with limited memory, a time lag in loading the introduction video may result in a blank screen when the app is loaded as the introduction video is the first video in the series. To avoid such a blank screen, the poster image can be a placeholder. The poster image can be a promotional image of the company or the first slide of the introduction video to ensure a smooth transition when the video loads. The poster image can be specified with the key word INTRO_POSTER_IMAGE on the eighth column followed by the URL string on the ninth column.

A sample row for the introduction video is as follows:    

| Column 1 | Column 2 | Column 3 | Column 4 | Column 5 | Column 6 | Column 7 | Column 8 | Column 9 |   
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| INTRO_INFO | INTRO_TITLE | Some intro title | INTRO_VIDEO_URL | http://some-url.com/introvideo.mp4 | FRAMES_PER_SECOND | 30 | INTRO_POSTER_IMAGE | http://some-url.com/introposter.png |


### Selection video

The row for the selection video begins with the key word SELECT_INFO on the first column. The selection video has a few more parameters as compared to the introduction video due to the fact that the selection video loops infinitely until the viewer makes their selection. The following parameters can be defined for the Selection video:

- Title of the video: The title of the selection video can be specified with the key word SELECT_TITLE on the second column and the title string on the third column.
- URL of the video: The URL of the selection video can be specified with the key word SELECT_VIDEO_URL on the fourth column following by the URL string on the fifth column.
- Instant to show the selection table: The selection video can begin with some random graphics and speech after which the viewer will be presented with a selection table. Therefore, the time instant at which the selection table will appear is a parameter that is configurable. This parameter can be specified with the key word START_INTERACTIVE_TIMESTAMP on the sixth column followed by the time specified as a string in the format HH:MM:SS:FF (Hours:Minutes:Seconds:Frames) in the seventh column.
- Instant when video loops back: As the selection video nears the end, it loops back to somewhere earlier in the video. The time instant when the video begins to loop is specified by the key word START_LOOP_TIMESTAMP on the eighth column following by the time specified as a string in the format HH:MM:SS:FF (Hours:Minutes:Seconds:Frames) in the ninth column.
- Instant to when the video loops: The time instant to when the video loops is specified by the key word JUMPTO_LOOP_TIMESTAMP on the tenth column following by the time specified as a string in the format HH:MM:SS:FF (Hours:Minutes:Seconds:Frames) in the eleventh column. This time instant needs to be lesser than START_LOOP_TIMESTAMP.
- Text above the table: Along with the selection table, it is also possible to configure the text above the table as a form of table heading. This can be specified using the key word SELECT_DIRECTION_TEXT on the twelfth column followed by the string on the thirteenth column.

A sample row for the selection video is as follows:    

| Column 1 | Column 2 | Column 3 | Column 4 | Column 5 | Column 6 | Column 7 | Column 8 | Column 9 | Column 10 | Column 11 | Column 12 | Column 13 |      
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | --------- | --------- | --------- | --------- |
| SELECT_INFO | SELECT_TITLE | Some selection video title | SELECT_VIDEO_URL | http://some-url.com/selectvideo.mp4 | START_INTERACTIVE_TIMESTAMP | 0:00:15:00 | START_LOOP_TIMESTAMP | 0:03:15:00 | JUMPTO_LOOP_TIMESTAMP | 0:00:18:00 | SELECT_DIRECTION_TEXT | Choose the video below to customize your playlist |


### Ending video

Though the playlist videos appear before the ending video, the playlist videos need three rows for their configuration. Therefore, it is recommended to specify the ending video after the selection video and leave the playlist videos for the last. The first column of the Ending video configuration starts with the key word ENDSCREEN_INFO. The parameters for the ending video are very similar to the selection video as this video also loops infinitely. he following parameters can be defined for the Ending video:

- Title of the video: The title of the ending video can be specified with the key word ENDSCREEN_TITLE on the second column and the title string on the third column.
- URL of the video: The URL of the ending video can be specified with the key word ENDSCREEN_VIDEO_URL on the fourth column following by the URL string on the fifth column.
- Instant when video loops back: As the ending video nears the end, it loops back to somewhere earlier in the video. The time instant when the video begins to loop is specified by the key word START_LOOP_TIMESTAMP on the sixth column following by the time specified as a string in the format HH:MM:SS:FF (Hours:Minutes:Seconds:Frames) in the seventh column.
- Instant to when the video loops: The time instant to when the video loops is specified by the key word JUMPTO_LOOP_TIMESTAMP on the eighth column following by the time specified as a string in the format HH:MM:SS:FF (Hours:Minutes:Seconds:Frames) in the ninth column. This time instant needs to be lesser than START_LOOP_TIMESTAMP.
- Time instant for call for action click: After a particular time instant, any click made by the viewer on the video will open a new browser tab taking the viewer to the company marketing page. This is specified with the key word START_HOTSPOT_TIMESTAMP on the tenth column followed by the time specified as a string in the format HH:MM:SS:FF (Hours:Minutes:Seconds:Frames) in the eleventh column.
- Call for action URL - This is the URL of the company page to which the viewer is redirected upon clicking the video. It is specified with the key word JUMPTO_URL in the twelfth column followed by the URL as a string in the thirteenth column.

A sample row for the ending video is as follows:    

| Column 1 | Column 2 | Column 3 | Column 4 | Column 5 | Column 6 | Column 7 | Column 8 | Column 9 | Column 10 | Column 11 | Column 12 | Column 13 |      
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | --------- | --------- | --------- | --------- |
| ENDSCREEN_INFO | ENDSCREEN_TITLE | Some ending video title | ENDSCREEN_VIDEO_URL | http://some-url.com/endingvideo.mp4 | START_LOOP_TIMESTAMP | 0:03:15:00 | JUMPTO_LOOP_TIMESTAMP | 0:03:15:00 | START_HOTSPOT_TIMESTAMP | 0:00:18:00 | JUMPTO_URL | http://company-info.com |


### Playlist videos

The playlist videos need three rows for their configuration, but are otherwise simple to specify as there is not much interactivity in them. To configure the playlist videos, we must specify the titles of the video on the first row, the URLs of the long videos on the second row and the URLs of the short videos on the third row.    

- Titles of the videos: The first column of the first row will have the key word SEGMENT_TITLES. The columns from the second onwards will have the titles of the playlist videos.
- URLs of the long videos: The first column of the second row will have the key word SEGMENT_VIDEO_URL_LONG. The columns from the second onwards will have the URLs of the long videos.
- URLs of the long videos: The first column of the second row will have the key word SEGMENT_VIDEO_URL_SHORT. The columns from the second onwards will have the URLs of the short videos.

Sample rows for the playlist videos are as follows:    

| Column 1 | Column 2 | Column 3 | Column 4 | Column 5 | Column 6 |          
| -------- | -------- | -------- | -------- | -------- | -------- |   
| SEGMENT_TITLES | Playlist video 1 | Playlist video 2 | Playlist video 3 | Playlist video 4 | Playlist video 5 |    
| SEGMENT_VIDEO_URL_LONG | http://some-url/video1.mp4 | http://some-url/video2.mp4 | http://some-url/video3.mp4 | http://some-url/video4.mp4 | http://some-url/video5.mp4 |
| SEGMENT_VIDEO_URL_SHORT | http://some-url/video6.mp4 | http://some-url/video7.mp4 | http://some-url/video8.mp4 | http://some-url/video9.mp4 | http://some-url/video10.mp4 |
     
     
     
To sum up all the configuration options, the complete .csv file would look as follows:

| Column 1 | Column 2 | Column 3 | Column 4 | Column 5 | Column 6 | Column 7 | Column 8 | Column 9 | Column 10 | Column 11 | Column 12 | Column 13 |       
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | --------- | --------- | --------- | --------- | 
| INTRO_INFO | INTRO_TITLE | Some intro title | INTRO_VIDEO_URL | http://some-url.com/introvideo.mp4 | FRAMES_PER_SECOND | 30 | INTRO_POSTER_IMAGE | http://some-url.com/introposter.png |
| SELECT_INFO | SELECT_TITLE | Some selection video title | SELECT_VIDEO_URL | http://some-url.com/selectvideo.mp4 | START_INTERACTIVE_TIMESTAMP | 0:00:15:00 | START_LOOP_TIMESTAMP | 0:03:15:00 | JUMPTO_LOOP_TIMESTAMP | 0:00:18:00 | SELECT_DIRECTION_TEXT | Choose the video below to customize your playlist |
| ENDSCREEN_INFO | ENDSCREEN_TITLE | Some ending video title | ENDSCREEN_VIDEO_URL | http://some-url.com/endingvideo.mp4 | START_LOOP_TIMESTAMP | 0:03:15:00 | JUMPTO_LOOP_TIMESTAMP | 0:03:15:00 | START_HOTSPOT_TIMESTAMP | 0:00:18:00 | JUMPTO_URL | http://company-info.com |
| SEGMENT_TITLES | Playlist video 1 | Playlist video 2 | Playlist video 3 | Playlist video 4 | Playlist video 5 |    
| SEGMENT_VIDEO_URL_LONG | http://some-url/video1.mp4 | http://some-url/video2.mp4 | http://some-url/video3.mp4 | http://some-url/video4.mp4 | http://some-url/video5.mp4 |
| SEGMENT_VIDEO_URL_SHORT | http://some-url/video6.mp4 | http://some-url/video7.mp4 | http://some-url/video8.mp4 | http://some-url/video9.mp4 | http://some-url/video10.mp4 |





