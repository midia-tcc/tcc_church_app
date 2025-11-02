TCC Church - Expo React Native (JavaScript) scaffold

How to run:
1. Install Node.js (LTS) and npm.
2. Install expo CLI (optional): npm install -g expo-cli
3. In the project folder:
   npm install
4. Add your YouTube API key in config.js at YOUTUBE_API_KEY.
5. Start:
   npx expo start
6. Open Expo Go on your phone and scan the QR code.

Notes:
- This scaffold uses a local events.json for the Agenda screen. Later we can connect Google Sheets.
- Sermons screen calls YouTube Data API; you may need to replace YOUTUBE_CHANNEL_ID with the actual channel ID (UC...).
- Prayer sends a mailto: to contato@tempodacolheitachurch.co.uk
