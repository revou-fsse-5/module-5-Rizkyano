import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

interface ListProductValues {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  onAddCart: () => void;
  onRemoveCart: () => void;
  inCart: boolean;
}

const ListProduct: React.FC<ListProductValues> = ({ id, title, price, image, onAddCart, onRemoveCart, inCart }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
      <div>
        <CardMedia component="img" alt="green iguana" sx={{ height: 300, objectFit: "contain" }} image={image} />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          $ {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleNavigate} size="medium">
          Details
        </Button>
        <Button size="medium" onClick={inCart ? onRemoveCart : onAddCart}>
          {inCart ? "Remove From Cart" : "Add To Cart"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ListProduct;
