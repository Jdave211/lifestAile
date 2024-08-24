import axios from 'axios';

const API_KEY = 'AIzaSyCniT9p6x9vnLsfXYZh5lWr1Yg4BE4rafs';
const keywords = ['AI tools', 'machine learning', 'artificial intelligence'];

const fetchChannelIds = async (keyword) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: encodeURIComponent(keyword), // Ensure the query is URL-encoded
        type: 'channel',
        maxResults: 10,
        key: API_KEY
      }
    });

    const channelIds = response.data.items.map(item => item.id.channelId);
    return channelIds;
  } catch (error) {
    console.error('Error fetching channel IDs:', error.response ? error.response.data : error.message);
    return [];
  }
};

const fetchVideosFromChannel = async (channelId) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        channelId: channelId,
        maxResults: 10,
        order: 'date',
        type: 'video',
        key: API_KEY
      }
    });

    const videos = response.data.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));

    return videos;
  } catch (error) {
    console.error(`Error fetching videos for channel ID ${channelId}:`, error.response ? error.response.data : error.message);
    return [];
  }
};

const fetchAllChannelIds = async (keywords) => {
  const allChannelIds = [];
  for (const keyword of keywords) {
    const channelIds = await fetchChannelIds(keyword);
    allChannelIds.push(...channelIds);
  }
  return allChannelIds;
};

const fetchAllVideos = async (keywords) => {
  const allChannelIds = await fetchAllChannelIds(keywords);
  const allVideos = [];
  for (const channelId of allChannelIds) {
    const videos = await fetchVideosFromChannel(channelId);
    allVideos.push(...videos);
  }
  return allVideos;
};

fetchAllVideos(keywords).then(videos => {
  console.log('All Videos:', videos);
}).catch(error => {
  console.error('Error fetching videos:', error);
});
