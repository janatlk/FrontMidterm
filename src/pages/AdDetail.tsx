import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../AxiosApi";
import CardFocused from "../components/CardFocused.tsx";
const AdDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ad, setAd] = useState<{ title: string; description: string; price: number; imageUrl: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAd = async () => {
            try {
                const response = await api.get(`ads/${id}.json`);
                if (response.data) {
                    setAd(response.data);
                } else {
                    setError("Объявление не найдено");
                }
            } catch (err) {
                setError("Ошибка загрузки объявления");
            } finally {
                setLoading(false);
            }
        };

        fetchAd();
    }, [id]);

    // Удаление объявления с подтверждением
    const handleDelete = async () => {
        const isConfirmed = window.confirm("Вы уверены, что хотите удалить это объявление?");
        if (isConfirmed) {
            try {
                await api.delete(`ads/${id}.json`);
                alert("Объявление удалено!");
                navigate("/");
            } catch (err) {
                setError("Ошибка при удалении объявления");
            }
        }
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!ad) return <p>Объявление не найдено</p>;

    return (
        <div>
            <h2>Детали объявления</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
            <CardFocused
                image={ad.imageUrl}
                title={ad.title}
                description={ad.description}
                price={ad.price.toString()}
                onEdit={() => navigate(`/edit-ad/${id}`)}
                onDelete={handleDelete}
            />

            </div>
        </div>
    );
};

export default AdDetail;
