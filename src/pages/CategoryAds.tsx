import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../AxiosApi";

const CategoryAds = () => {
    const { categoryId } = useParams();
    const [ads, setAds] = useState<
        { id: string; title: string; description: string; price: number; imageUrl: string; categoryId: string }[]
    >([]);
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const adsResponse = await api.get("ads.json");
                const categoriesResponse = await api.get("categories.json");

                if (categoriesResponse.data && categoriesResponse.data[categoryId]) {
                    setCategoryName(categoriesResponse.data[categoryId].name);
                }

                if (adsResponse.data) {
                    const formattedAds = Object.entries(adsResponse.data).map(([id, value]: any) => ({
                        id,
                        ...value,
                    }));
                    setAds(formattedAds.filter((ad) => ad.categoryId === categoryId));
                }
            } catch (error) {
                console.error("Ошибка загрузки объявлений:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, [categoryId]);

    return (
        <div>
            <h2>Объявления в категории: {categoryName}</h2>
            {loading ? <p>Загрузка...</p> : null}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {ads.length > 0 ? (
                    ads.map((ad) => (
                        <div
                            key={ad.id}
                            style={{ cursor: "pointer", border: "1px solid #ddd", padding: "10px", width: "250px" }}
                        >
                            <img
                                src={ad.imageUrl}
                                alt={ad.title}
                                style={{ width: "100%", height: "150px", objectFit: "cover" }}
                            />
                            <h3>{ad.title}</h3>
                            <p>{ad.description}</p>
                            <p>
                                <strong>Цена:</strong> {ad.price} $
                            </p>
                        </div>
                    ))
                ) : (
                    <p>Нет объявлений в этой категории</p>
                )}
            </div>
        </div>
    );
};

export default CategoryAds;
