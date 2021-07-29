# Untact Meeting helper

This is for all people who want to efficiently record, share meethings.

# How it works?

Google server will convert speech from the device's microphone to text. It will return to browser with a Speech recognition instance

## Supported browsers

- Chrome (desktop): this is by far the smoothest experience
- Safari 14.1
- Microsoft Edge
- Chrome (Android): a word of warning about this platform, which is that there can be an annoying beeping sound when turning the microphone on. This is part of the \* Android OS and cannot be controlled from the browser
- Android webview
- Samsung Internet

## Compatible version

- React 16.8 (React hook can be used)
- [Web speech recognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#constructor)
- npm [react-speech-recognition](https://www.npmjs.com/package/react-speech-recognition)
  - Under the hood, it uses `Web Speech API`.
