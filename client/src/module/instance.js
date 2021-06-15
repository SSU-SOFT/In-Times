import axios from "axios";

const instance = axios.create({
    baseURL: "http://13.209.70.51:5000",
});

export default instance;
