import ProductCard from '../product-card/product-card.component';
import './category-preview.styles.scss';

import {Link} from 'react-router-dom';

const CategoryPreview = ({title, products}) => {
  return (
    <div className="category-preview-container">
      <h2>
        {/* <span className="title">{title.toUpperCase()}</span> */}
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>

      </h2>
      <div className="preview">
        {
          products.filter((_, index) => index < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product}/>))
        }
        
      </div>
    </div>
  );
}

export default CategoryPreview;