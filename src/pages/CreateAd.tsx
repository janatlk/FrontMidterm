import { useState, useEffect } from "react";
import api from "../AxiosApi";

const CreateAd = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Загружаем категории из Firebase
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

        fetchCategories();
    }, []);

    // Функция отправки объявления
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !price || !categoryId || !imageUrl) {
            setError("Заполните все поля!");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await api.post("ads.json", {
                title,
                description,
                price: parseFloat(price),
                categoryId,
                imageUrl,
            });

            setTitle("");
            setDescription("");
            setPrice("");
            setCategoryId("");
            setImageUrl("");
            alert("Объявление добавлено!");
        } catch (err) {
            setError("Ошибка при добавлении объявления!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Создать объявление</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Название"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Цена"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    <option value="">Выберите категорию</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Ссылка на изображение"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Добавление..." : "Добавить"}
                </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default CreateAd;
