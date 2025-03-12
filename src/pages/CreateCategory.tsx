import { useState } from "react";
import api from "../AxiosApi";

const CreateCategory = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return setError("Название категории не может быть пустым!");

        setLoading(true);
        setError("");

        try {
            await api.post("categories.json", { name });
            setName("");
            alert("Категория добавлена!");
        } catch (err) {
            setError("Ошибка при добавлении категории!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Создать категорию</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Название категории"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Добавление..." : "Добавить"}
                </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default CreateCategory;
