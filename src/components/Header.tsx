import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../AxiosApi";
import { AppBar, Box, Button, Container, Toolbar, Typography, Menu, MenuItem, IconButton } from "@mui/material";

const Header = () => {
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openMenu, setOpenMenu] = useState(false);

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

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(true);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setOpenMenu(false);
    };

    return (
        <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                            Все объявления
                        </Link>
                    </Typography>

                    {/* Desktop Menu for categories */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: "20px" }}>
                        {categories.map((category) => (
                            <Button key={category.id} color="inherit">
                                <Link to={`/category/${category.id}`} style={{ color: "white", textDecoration: "none" }}>
                                    {category.name}
                                </Link>
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: "20px" }}>
                        <Button color="inherit">
                            <Link to="/createCategory" style={{ color: "white", textDecoration: "none" }}>
                                Создать категорию
                            </Link>
                        </Button>
                        <Button color="inherit">
                            <Link to="/createAd" style={{ color: "white", textDecoration: "none" }}>
                                Создать объявление
                            </Link>
                        </Button>
                    </Box>


                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
