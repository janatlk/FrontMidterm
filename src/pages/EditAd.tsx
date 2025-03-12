import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../AxiosApi";

const EditAd = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAd = async () => {
            try {
                const response = await api.get(`ads/${id}.json`);
                if (response.data) {
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                    setPrice(response.data.price);
                    setImageUrl(response.data.imageUrl);
                }
            } catch (error) {
                setError("Ошибка загрузки объявления");
            }
        };

        fetchAd();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !price || !imageUrl) {
            setError("Заполните все поля!");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await api.put(`ads/${id}.json`, {
                title,
                description,
                price: parseFloat(price),
                imageUrl,
            });

            alert("Объявление обновлено!");
            navigate(`/ad/${id}`);
        } catch (err) {
            setError("Ошибка при обновлении объявления!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Редактировать объявление</h2>
    <form onSubmit={handleSubmit}>
    <input type="text" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} />
    <textarea placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} />
    <input type="number" placeholder="Цена" value={price} onChange={(e) => setPrice(e.target.value)} />
    <input type="text" placeholder="Ссылка на изображение" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
    <button type="submit" disabled={loading}>
        {loading ? "Обновление..." : "Обновить"}
        </button>
        </form>
    {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    );
    };

    export default EditAd;
