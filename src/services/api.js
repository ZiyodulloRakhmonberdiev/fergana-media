import axios from 'axios';

// Base URL
const API_URL = 'https://ferganamedia.pythonanywhere.com/';

// Axios instansiyasi
const api = axios.create({
    baseURL: API_URL,
});

// Token olish funksiyasi
const getToken = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}token/`, {
            username,
            password,
        });
        const { access } = response.data;
        // Tokenni saqlash
        localStorage.setItem('token', access);
        return access;
    } catch (error) {
        console.error('Token olishda xatolik:', error);
        throw error;
    }
};

// Interceptorlar yordamida so'rovlarni yangilash
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Tokenni qo'shish
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Foydalanish
const loginAndFetchData = async () => {
    try {
        await getToken('admin', '123');
        // API ga so'rov yuborish
        const dataResponse = await api.get('/ads/'); // Misol uchun
        console.log(dataResponse.data);
    } catch (error) {
        console.error('Ошибка при получении информации:', error);
    }
};

// Foydalanish uchun funksiyani chaqirish
loginAndFetchData();

export default api