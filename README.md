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

### End mode

After watching all the videos, the viewer will arrive at a video that concludes on the presentation.

![ending](https://github.com/shivkiyer/accordion-player/assets/3229548/2f7dc758-13b4-47aa-8704-f387fb22731c)

The company can provide a quick overview of their products and also on how an interested viewer can contact them. The ending video also loops continuously similar to the selection video. To exit the presentation, the viewer can click on the video as it loops and be taken to an action URL of the company that either provides additional information or instructions on how to contact the company for sales information.




