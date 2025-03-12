import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../AxiosApi";
import './css/Inputs.css'

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await api.get(`categories/${id}.json`);
                if (response.data) {
                    setName(response.data.name);
                }
            } catch (error) {
                console.error("Ошибка загрузки категории:", error);
            }
        };

        fetchCategory();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError("Название категории не может быть пустым!");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await api.put(`categories/${id}.json`, { name });
            alert("Категория обновлена!");
            navigate("/");
        } catch (err) {
            setError("Ошибка при обновлении категории!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Редактировать категорию</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Название категории"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Обновление..." : "Обновить"}
                </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default EditCategory;
