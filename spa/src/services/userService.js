import axios from "axios";
const baseURL = "http://localhost:3001";

export function getAllNews() {
  const response = axios.get(`${baseURL}/posts`);
  return response;
}
