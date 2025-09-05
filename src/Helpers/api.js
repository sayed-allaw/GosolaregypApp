import axios from 'axios';

export default axios.create({
  baseURL: 'https://camp-coding.online/go_solar/user/',
  //   timeout: 30000,
});
