import { useState, useEffect } from "react";
import api from "../AxiosApi";
import {MenuItem, Select, TextField} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import './css/Inputs.css'
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import Button from "@mui/material/Button";
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
        <div className={'Container'}>
            <h2>Создать объявление</h2>
            <div className="content">
            <form onSubmit={handleSubmit} >
                <TextField id="outlined-basic"
                           className={'TextField'}
                           label="Название"
                           variant="outlined"
                           type={'text'}
                           value={title}
                           sx={{marginBottom:1}}
                           onChange={(e) => setTitle(e.target.value)}/>
                <TextField id="outlined-basic"
                           className={'TextField'}
                    label={"Описание"}
                    value={description}
                           sx={{marginBottom:1}}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField id="outlined-basic"
                           className={'TextField'}
                    type={"number"}
                    label={"Цена"}
                    value={price}
                           sx={{marginBottom:1}}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <FormControl component="fieldset" sx={{ m: 0, minWidth: 170 }}>
                <InputLabel id="outlined-basic" >Категория</InputLabel>
                <Select sx={{marginBottom:1}} fullWidth label='Выберите Категорию' value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
                </FormControl>
                <TextField
                    sx={{marginBottom:1}}
                    className={'TextField'}
                    type="text"
                    label="Ссылка на изображение"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <Button variant={'contained'} type="submit" disabled={loading} endIcon={<KeyboardDoubleArrowRightOutlinedIcon />}>
                    {loading ? "Добавление..." : "Добавить"}
                </Button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    );
};

export default CreateAd;
