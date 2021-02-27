import axios from 'axios';

async function getPosts(subreddit) {
  const url = `https://www.reddit.com/r/${subreddit}.json`;
  const response = await axios.get(url)
    .then(res => res.data.data.children)
    .catch(err => {
      throw err
    });
  
  return response;
}

async function getSearch(params) {
  const url = `https://www.reddit.com/search.json?q=${params}&type=sr&limit=50`;
  const response = await axios
    .get(url)
    .then(response => response.data.data.children.map(child => child.data))
    .catch(err => {
      throw err;
    });
  return response;
}


export default {
  getPosts,
  getSearch,
};