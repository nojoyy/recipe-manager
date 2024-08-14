
type RecipeCardProps = {
  id?: string;
  title: string;
  imageAddr?: string;
};

const RecipeCard = ({ id, title, imageAddr }: RecipeCardProps) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};

export default RecipeCard;
