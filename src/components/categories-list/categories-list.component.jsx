import CategoryItem from '../category-item/category-item.component';

import './categories-list.styles.scss';

const CategoriesList = () => {

  const categories = [
    {
      id: 1,
      title: "Women",
      imageUrl: "./img/women.jpg"
    },
    {
      id: 2,
      title: "Men",
      imageUrl: "./img/men.jpg"
    },
    {
      id: 3,
      title: "Hats",
      imageUrl: "./img/hats.jpg"
    },
    {
      id: 4,
      title: "Sneakers",
      imageUrl: "./img/sneakers.jpg"

    },
    {
      id: 5,
      title: "Jackets",
      imageUrl: "./img/jackets.jpg"

    },

  ];

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}

export default CategoriesList;
