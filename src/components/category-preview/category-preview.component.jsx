import ProductCard from '../product-card/product-card.component';
import { CategoryPreviewContainer, Title } from './category-preview.styles';

const CategoryPreview = ({title, products}) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        {/* <span className="title">{title.toUpperCase()}</span> */}
        <Title to={title}>
          {title.toUpperCase()}
        </Title>

      </h2>
      <div className="preview">
        {
          products.filter((_, index) => index < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product}/>))
        }
        
      </div>
    </CategoryPreviewContainer>
  );
}

export default CategoryPreview;