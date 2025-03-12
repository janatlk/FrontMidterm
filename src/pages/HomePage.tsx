import { useEffect, useState } from "react";
import api from "../AxiosApi";
import { useNavigate } from "react-router-dom";
import ActionAreaCard from "../components/Card";
import './css/HomePage.css'
import {ListItem, List, ListItemText, Button} from "@mui/material";

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
        <div className='Container1'>
            <div className={'FirstHalf'}>
                <h2>Категории</h2>
                <List>
                    {categories.map((category) => (
                        <ListItem
                            key={category.id}
                            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        >
                            <ListItemText primary={category.name} />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate(`/edit-category/${category.id}`)}
                            >
                                Редактировать
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </div>

            <div className={'SecondHalf'}>
                <div>
                    <h2>Все объявления</h2>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    {ads.map((ad) => (
                        <ActionAreaCard
                            key={ad.id}
                            image={ad.imageUrl}
                            title={ad.title}
                            price={ad.price}
                            onClick={() => navigate(`/ad/${ad.id}`)}
                        />
                    ))}
                </div>
            </div>


        </div>
    );
};

export default HomePage;
