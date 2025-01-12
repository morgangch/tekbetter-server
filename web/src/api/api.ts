import axios from "axios";

const backend_url = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080"

const api = axios.create({
    baseURL: `${backend_url}/api/`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '// + localStorage.getItem('session')
    }
});


// // Handle 401
// api.interceptors.response.use((response) => {
//     return response;
// }, function (error) {
//     if (!error.response) {
//         myAlert.setMaintenance(true);
//     }
//
//     if (!is_remote && error.response.status === 401 && window.location.pathname !== "/login") {
//         window.location.href = "/login";
//     }
//     if (error.response.status === 500) {
//         myAlert.open("Erreur", "Une erreur serveur est survenue, veuillez réessayer plus tard.");
//     }
//     return Promise.reject(error);
// });


export default api;