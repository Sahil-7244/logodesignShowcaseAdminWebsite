// authService.js

import axios from "axios";

axios.defaults.withCredentials = true;

const checkSession = async () => {
  try {
    // console.log("Logging");
    await axios.post(`${process.env.REACT_APP_SITEURL}/session`,{},{withCredentials: true});
    return true; // Session is valid
  } catch (error) {
    console.log("Session check failedddd: ", error);
    return false; // Session is not valid
  }
};

export default checkSession;
