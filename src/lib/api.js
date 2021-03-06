import axios from 'axios';

async function getPosts(subreddit, limit) {
  const url = `https://www.reddit.com/r/${subreddit}.json?limit=${limit}`;
  const response = await axios
    .get(url, {
      crossDomain: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(res => res.data.data.children)
    .catch(err => {
      throw err;
    });

  return response;
}

async function getSearch(params) {
  const url = `https://www.reddit.com/search.json?q=${params}&type=sr&limit=50`;
  const response = await axios
    .get(url, {
      crossDomain: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    })
    .then(res => res.data.data.children.map(child => child.data))
    .catch(err => {
      throw err;
    });

  return response;
}

export default {
  getPosts,
  getSearch,
};