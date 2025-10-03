import axios from "axios";
const API_URL = "http://localhost:4000/api/post";

axios.defaults.withCredentials = true;

export const Lost = async ({ 
  lItemName,
  lCategory,
  lDescription,
  lverificationHint,
  lDateLost,
  lApproxTime,
  lLocation,
  lImage
}) => {
  // get token from localStorage (saved after login)
  const token = localStorage.getItem("token");

  const payload = {
    lItemName,
    lCategory,
    lDescription,
    lverificationHint,
    lDateLost,
    lApproxTime,
    lLocation,
    lImage
  };

  if (token) {
    // send token as Authorization header
    return axios.post(`${API_URL}/lost`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } else {
    // fallback: send cookie (if backend sets token cookie)
    return axios.post(`${API_URL}/lost`, payload, { withCredentials: true });
  }
};


  export const Found = async ({
    fItemName,
    fCategory,
    fDescription,
    fverificationHint,
    fDateFound,
    fApproxTime,
    fLocation,
    fImage
  }) => {
    // get token from localStorage (saved after login)
    const token = localStorage.getItem("token");
  
    const payload = {
      fItemName,
      fCategory,
      fDescription,
      fverificationHint,
      fDateFound,
      fApproxTime,
      fLocation,
      fImage
    };
  
    if (token) {
      // send token as Authorization header
      return axios.post(`${API_URL}/found`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      // fallback: send cookie (if backend sets token cookie)
      return axios.post(`${API_URL}/found`, payload, { withCredentials: true });
    }
  };
  