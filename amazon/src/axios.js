import axios from "axios";

const instance = axios.create({
  baseURL: "",
});

export default instance;

// http://localhost:5001/clone-b72c0/us-central1/api
