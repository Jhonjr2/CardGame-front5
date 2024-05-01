import axiosOriginal from 'axios';

const url = axiosOriginal.create({
    baseURL: import.meta.env.VITE_API_URL
})

// axios.interceptors.request.use(function (config) {
//     const token = store.getState().auth.token;
//     if(config.headers?.token) return config;
//     config.headers.token =  token;
//     return config;
// });

// axios.interceptors.response.use((res) => {
//     return res;
// }, error => {
//     if(error.response?.status === 401) throw error;
//     store.dispatch(showNotification({
//         variant: "danger",
//         message: "there is no Internet conection"
//     }))
//     console.log(error);
//     throw error;
// })

// axios.interceptors.request.use(
//     async (config) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers['token'] = token;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
export default axios;
