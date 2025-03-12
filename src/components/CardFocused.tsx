import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface CardFocusedProps {
    image: string;
    title: string;
    description: string;
    price: string;
    onEdit: () => void;
    onDelete: () => void;
}

export default function CardFocused({
                                        image,
                                        title,
                                        description,
                                        price,
                                        onEdit,
                                        onDelete,
                                    }: CardFocusedProps) {
    return (
        <Card sx={{ width: '900px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',  }}>
            <div>
            <CardMedia
                component="img"
                alt={title}
                height="400"
                image={image}
            />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Price: {price} $
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="large" variant={'contained'} onClick={onEdit}>Редактировать</Button>
                <Button size="large" variant={"contained"} onClick={onDelete}>Удалить</Button>
            </CardActions>

            </div>
        </Card>
    );
}
