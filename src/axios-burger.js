import axios from "axios";
import config from "./config";
const axiosBurger = axios.create({
  baseURL: config.api.url,
});
// axiosBurger.defaults.headers.common["Authorization"] = config.api.auth;
//Respestra nombre de cabeceras
axiosBurger.defaults.headers.post["Content-Type"] = config.api.contentType;

export default axiosBurger;
