# Video Learning App - YouTube Integration

## YouTube Player Integration

This app uses the **YouTube IFrame API** directly to play videos, which provides several advantages:

### Why YouTube IFrame API?

1. **Ad Support**: Videos with ads play correctly (ReactPlayer had issues with ads)
2. **Better Embedding**: Direct API access gives more control over the player
3. **No CORS Issues**: YouTube's official API handles embedding permissions properly
4. **Native Controls**: Uses YouTube's native player with all features

### Features

✅ **Direct YouTube Video Playback**
- Plays YouTube videos with full controls
- Supports videos with ads
- Handles all YouTube embedding scenarios

✅ **YouTube Video Search**
- Search any YouTube video directly from the app
- Select and play videos instantly
- Great for finding supplementary learning content

✅ **Progress Tracking**
- Tracks watch progress for each lesson
- Auto-advance to next lesson
- Resume from where you left off

## Setup Instructions

### 1. Get YouTube API Key (for search feature)

The video player works without an API key, but to enable YouTube search:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **YouTube Data API v3**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy your API key

### 2. Configure Environment Variables

```bash
# Copy the example file
cp .env.local.example .env.local

# Add your YouTube API key
NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here
```

### 3. Start the App

```bash
npm install
npm run dev
```

## Usage

### Playing Course Videos

1. Navigate to any course
2. Click "Watch Course"
3. Videos play automatically with YouTube's native controls

### Searching YouTube Videos

1. On the watch page, click **"🔍 Search YouTube Videos"**
2. Enter your search query
3. Click on any video to play it
4. Click **"← Back to Course Video"** to return

### Video Controls

- ▶️ Play/Pause
- ⏩ Skip forward/backward
- 🔊 Volume control
- ⚙️ Quality settings
- 📺 Fullscreen
- 🎬 Picture-in-Picture (if supported)
- ⚡ Playback speed
- 📝 Captions/Subtitles

All controls are provided by YouTube's native player.

## Technical Details

### Video Player Component

Located in: `components/video/VideoPlayer.js`

- Uses YouTube IFrame API directly
- Extracts video ID from various YouTube URL formats
- Handles player lifecycle and events
- Tracks progress for resume functionality

### YouTube Search Component

Located in: `components/video/YouTubeSearch.js`

- Uses YouTube Data API v3
- Returns top 10 results
- Shows thumbnails and descriptions
- Instant video selection

## Troubleshooting

### Videos not loading?

**Error: "Video owner does not allow embedding"**
- Some videos have embedding disabled by the uploader
- Try a different video or search for an alternative

**Error: "Invalid video ID"**
- Check that the YouTube URL is correct
- Supported formats:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `https://www.youtube.com/embed/VIDEO_ID`

### Search not working?

**Error: "YouTube API key not configured"**
- Add your API key to `.env.local`
- Restart the development server

**Error: "Failed to search YouTube"**
- Check your API key is valid
- Verify YouTube Data API v3 is enabled
- Check API quota limits (default: 10,000 units/day)

### Ads in videos?

This is normal! Videos with ads will play ads just like on YouTube. The YouTube IFrame API properly handles:
- Pre-roll ads
- Mid-roll ads
- Overlay ads
- Skippable/non-skippable ads

## API Limits

YouTube Data API v3 has daily quotas:

- **Search**: 100 units per query
- **Free tier**: 10,000 units/day
- **Approximately**: 100 searches per day

If you hit the limit, searches will fail until the quota resets (midnight Pacific Time).

## Security Notes

- API key is client-side (`NEXT_PUBLIC_*`)
- Restrict your API key in Google Cloud Console
- Limit to YouTube Data API v3 only
- Consider adding HTTP referrer restrictions

## Future Enhancements

- [ ] Playlist support
- [ ] Video bookmarks
- [ ] Watch later list
- [ ] Video notes/comments
- [ ] Advanced search filters
- [ ] Video recommendations

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review YouTube IFrame API docs: https://developers.google.com/youtube/iframe_api_reference
3. Check YouTube Data API docs: https://developers.google.com/youtube/v3

---

**Note**: This app uses YouTube's official APIs and complies with their Terms of Service. Videos play within YouTube's iframe, ensuring proper attribution and ad delivery to content creators.
