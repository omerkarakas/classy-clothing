import DirectoryItem from '../directory-item/directory-item.component';

import { DirectoryContainer } from './directory.styles';

const categories = [
  {
    id: 1,
    title: "Women",
    imageUrl: "./img/women.jpg",
    route:"shop/womens"
  },
  {
    id: 2,
    title: "Men",
    imageUrl: "./img/men.jpg",
    route:"shop/mens"
  },
  {
    id: 3,
    title: "Hats",
    imageUrl: "./img/hats.jpg",
    route:"shop/hats"
  },
  {
    id: 4,
    title: "Sneakers",
    imageUrl: "./img/sneakers.jpg",
    route:"shop/sneakers"
  },
  {
    id: 5,
    title: "Jackets",
    imageUrl: "./img/jackets.jpg",
    route:"shop/jackets"
  },

];
  
const Directory = () => {


  return (
    <DirectoryContainer>
      {
        categories.map((cat) => {
          return <DirectoryItem key={cat.id} category={cat} />
        })}
    </DirectoryContainer>
  );
}

export default Directory;
