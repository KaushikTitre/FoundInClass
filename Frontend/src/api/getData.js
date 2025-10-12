import axios from "axios";

const API_URL1 =
  window.location.hostname === "localhost"
    ? "http://localhost:4000/api/dashboard/data"
    : "https://foundinclass-production.up.railway.app/api/dashboard/data";

    const API_URL2 =
  window.location.hostname === "localhost"
    ? "http://localhost:4000/api/home/alldata"
    : "https://foundinclass-production.up.railway.app/api/home/alldata";


// const API_URL1 = "http://localhost:4000/api/dashboard/data";
// const API_URL2 = "http://localhost:4000/api/home/alldata"

axios.defaults.withCredentials = true;

export const dashboardData = async () => {
    // FIXED: Remove the curly braces around API_URL
    return await axios.get(API_URL1, { withCredentials: true });
};

export const homeData = async () => {
    return await axios.get(API_URL2);
}