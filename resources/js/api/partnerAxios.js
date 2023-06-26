import axios from "axios";
import Cookies from "js-cookie";


const partnerApi = axios.create({
    baseURL: `${process.env.MIX_PARTNER_URL}api/`
});

partnerApi.interceptors.request.use(
    function(config) {
        config.headers['lang'] = localStorage.getItem("lang") || 'ar';
        config.headers['Authorization'] = "Bearer " + (Cookies.get("token") || '');
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

partnerApi.defaults.headers.common['secretApi'] = 'Snr92EUKCmrE06PiJ';
partnerApi.defaults.headers.common['Accept'] = 'application/json';
// end axios

export default partnerApi;