import DirectoryItem from '../directory-item/directory-item.component';

import './directory.styles.scss';

const Directory = () => {

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
    <div className="directory-container">
      {
        categories.map((cat) => {
          return <DirectoryItem key={cat.id} category={cat} />
        })}
    </div>
  );
}

export default Directory;
