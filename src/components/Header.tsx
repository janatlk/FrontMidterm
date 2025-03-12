import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../AxiosApi";

const Header = () => {
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

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

    return (
        <nav style={{ padding: "10px", background: "#f5f5f5", display: "flex", gap: "15px" }}>
            <Link to="/">Все объявления</Link>
            {categories.map((category) => (
                <Link key={category.id} to={`/category/${category.id}`}>
                    {category.name}
                </Link>
            ))}
        </nav>
    );
};

export default Header;
