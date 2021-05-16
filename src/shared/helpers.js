import Axios from "axios"
//import urls from "./urls"


export function saveAuthInfo(authInfo, remember = false) {
  if (remember)
    return localStorage.setItem(
      "auth",
      JSON.stringify({
        ...authInfo
      })
    )
  return sessionStorage.setItem(
    "auth",
    JSON.stringify({
      ...authInfo
    })
  )
}





export function getAuthInfo() {
  const authInfo =
    sessionStorage.getItem("auth") || localStorage.getItem("auth")
  return authInfo ? JSON.parse(authInfo) : authInfo
}



export function clearAuthInfo() {
  localStorage.clear()
  sessionStorage.clear()
}






// export function refreshToken() {
//   Axios({
//     method: "post",
//     url: `${process.env.REACT_APP_BASEURL}${urls.authentication.refreshToken}`,
//     data: {
//       refresh_token: getAuthInfo().refresh_token
//     }
//   }).then(response => {
//     const authInfo = {
//       ...getAuthInfo(),
//       access_token: response.data.data.access_token,
//       refresh_token: response.data.data.refresh_token
//     }
//     saveAuthInfo(authInfo)
//     window.location.reload()
//   })
// }

// const UUIDv4Regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
// export function validateUUID(props, propName, componentName) {
//   if (!UUIDv4Regex.test(props[propName])) {
//     return new Error(
//       "Invalid prop `" +
//         propName +
//         "` supplied to" +
//         " `" +
//         componentName +
//         "`. UUID Validation failed."
//     )
//   }
// }
