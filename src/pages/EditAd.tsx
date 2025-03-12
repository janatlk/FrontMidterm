import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../AxiosApi";
import './css/Inputs.css'
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";

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
        <div className="Container">
            <h2>Редактировать объявление</h2>
            <div className={'content'}>
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
                <TextField
                    sx={{marginBottom:1}}
                    className={'TextField'}
                    type="text"
                    label="Ссылка на изображение"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <Button variant={'contained'} type="submit" disabled={loading} endIcon={<KeyboardDoubleArrowRightOutlinedIcon />}>
                    {loading ? "Изменение..." : "Редактировать"}
                </Button>
            </form>
            </div>
    {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    );
    };

    export default EditAd;
