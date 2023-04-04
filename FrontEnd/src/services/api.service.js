import axios from "axios";

const commonConfig = {
    headers: {
        "Content-Type": "application/json; multipart/form-data",
        Accept: "application/json; multipart/form-data",
    },
};

export default (baseURL) => {
    return axios.create({
        baseURL,
        ...commonConfig,
    });
};