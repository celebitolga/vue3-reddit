import axios from 'axios';

export default {
  async getPosts(subreddit) {
    const url = `https://www.reddit.com/r/${subreddit}.json`;
    const response = await axios.get(url)
      .then(res => res.data.data.children)
      .catch(err => {
        throw err
      });
    
    return response;
  }
}