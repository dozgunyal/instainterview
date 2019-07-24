# instainterview

This is a speaking exercise page for English learners. 
Users can go to page, enable mic, speak, see what they are saying or what browser understands.
Page will try to correct grammer mistakes.

This is a proof of concept project.

Works only on Chrome because of SpeechRecognition library limitations: https://caniuse.com/#search=SpeechRecognition

## Here is the list of technologies used:

* React.JS using hooks.

  Speech to Text library: react-speech-recognition: https://www.npmjs.com/package/react-speech-recognition
  
  https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

* After The Deadline Server for Grammer checks.

  Dockerized image of After the Deadline server. 
  
  To build the docker image, download the server from https://open.afterthedeadline.com/download/download-source-code/ and put it in the root folder of your project and run docker build
  
  To run the build: docker run -p 1049:1049 -t atdserver
  
