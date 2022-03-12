import axios from "axios";

export default function fetcher(url) {
  return axios.get(url).then((res) => res.data);
}
