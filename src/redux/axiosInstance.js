// src/api/axiosInstance.js
import axios from 'axios';
export const errorMessage = "Something went wrong .. please try again later";
export const paginatorSize = 15;


const axiosInstance = axios.create({
    baseURL: 'https://malazshukri.pythonanywhere.com/api/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // optional: 10 seconds timeout
});

// Optional: Add a request interceptor (مثلاً لإضافة التوكن تلقائيًا)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // أو أي مكان حافظ فيه التوكن
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: Add a response interceptor (مثلاً لفلترة الأخطاء)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // مثال: التعامل مع انتهاء صلاحية التوكن أو أي خطأ ثاني
        if (error.response?.status === 401) {
            console.warn("Unauthorized - Please login again.");
            // مثلاً: إعادة التوجيه إلى صفحة تسجيل الدخول
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
