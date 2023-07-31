import React from "react";
import Carousel from "components/carousel";
import Categories from "components/products/collections/categories";
import ProductsCollectionsList from "components/products/collections/list";

function ProductsView() {
  return (
    <>
      <Carousel />
      <Categories />
      <ProductsCollectionsList />
    </>
  );
}

export default ProductsView;
