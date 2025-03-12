import axios from "axios";


const FIREBASE_URL = "https://lalafo-janat-default-rtdb.europe-west1.firebasedatabase.app/";

// 🔹 Создаем экземпляр axios с базовым URL
const api = axios.create({
    baseURL: FIREBASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
