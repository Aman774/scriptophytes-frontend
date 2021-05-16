import Axios from "axios"
import { getAuthInfo } from "./helpers"

const axios = Axios.create({
  baseURL: "http://127.0.0.1:8000"
})

// request interceptor to add the token
axios.interceptors.request.use(request => {
  const authInfo = getAuthInfo()

  if (authInfo) {
    request.headers["Authorization"] = `Bearer ${authInfo.access}`
    // request.headers["Authorization"] = `Bearer PXsYed2DGAmHI6A45h34r92V6Prxgm`;

    // request.headers["Language"] = localStorage.getItem("language");
    request.headers["Content-Type"] = "application/json"
  }
 

  return request
})

// const REFRESH_TOKEN_ERROR_MESSAGES = [
//   "Invalid Token",
//   "Authentication credentials were not provided.",
//   "The access token has expired.",
//   "The access token is invalid."
// ]

// axios.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         if (REFRESH_TOKEN_ERROR_MESSAGES.includes(error.response.data.detail)) {
//           refreshToken()
//         }
//       } else {
//         return Promise.reject(error)
//       }
//     }
//     return Promise.reject(error)
//   }
// )

export default axios
