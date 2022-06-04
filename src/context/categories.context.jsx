import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

// import SHOP_DATA from '../shop-data.js';


export const CategoriesContext = createContext({
  
  categoriesMap: {}
});


export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    //using async function within useeffect:
    // define async function and call
    const getCategoriesMap = async() => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    }
    getCategoriesMap();
  }, []);
  
  // loading the file, used once
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);
  
  const value = { categoriesMap };



  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>; 

}