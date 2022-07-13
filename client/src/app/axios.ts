import axios from 'axios';

const instance = axios.create({
  baseURL: `${
    process.env.NODE_ENV === 'production'
      ? 'https://zvolcsey-conduit-server.onrender.com'
      : 'http://localhost:8080'
  }`,
});

export default instance;
