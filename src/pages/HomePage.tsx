import { useEffect, useState } from "react";
import api from "../AxiosApi";
import { useNavigate } from "react-router-dom";
import ActionAreaCard from "../components/Card";
const HomePage = () => {
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [ads, setAds] = useState<{ id: string; title: string; description: string; price: number; imageUrl: string; categoryId: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get("categories.json");
                if (response.data) {
                    const formattedCategories = Object.entries(response.data).map(([id, value]: any) => ({
                        id,
                        ...value,
                    }));
                    setCategories(formattedCategories);
                }
            } catch (error) {
                console.error("Ошибка загрузки категорий:", error);
            }
        };

        const fetchAds = async () => {
            try {
                const response = await api.get("ads.json");
                if (response.data) {
                    const formattedAds = Object.entries(response.data).map(([id, value]: any) => ({
                        id,
                        ...value,
                    }));
                    setAds(formattedAds);
                }
            } catch (error) {
                console.error("Ошибка загрузки объявлений:", error);
            } finally {
                setLoading(false);
                console.log(loading);
            }
        };

        fetchCategories();
        fetchAds();
    }, []);

    return (
        <div>
            <h2>Категории</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {category.name}
                        <button onClick={() => navigate(`/edit-category/${category.id}`)}>Редактировать</button>
                    </li>
                ))}
            </ul>

            <h2>Все объявления</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {ads.map((ad) => (
                    <ActionAreaCard
                        key={ad.id}
                        image={ad.imageUrl}
                        title={ad.title}
                        price={ad.price}
                        onClick={() => navigate(`/ad/${ad.id}`)}
                        style={{ cursor: "pointer", border: "1px solid #ddd", padding: "10px", width: "250px" }}
                    />
                ))}
            </div>

        </div>
    );
};

export default HomePage;
