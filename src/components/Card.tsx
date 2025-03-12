import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

interface CardProps {
    image: string;
    title: string;
    price: number;
    onClick: () => void;
}

function ActionAreaCard({ image, title, price, onClick }: CardProps) {
    return (
        <Card sx={{ width: 255, m:2}} onClick={onClick}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Цена: {price}$
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default ActionAreaCard;