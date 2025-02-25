import React from "react";
import { ProductPageItem } from '../components';
import { client } from '../lib/client';

const ProductsPageItem = ({ products }) => {
    // Group products by their category
    let categorizedProducts = {};

    for (let product of products) {
        const categoryName = product.productCategory.title;
        if (!categorizedProducts[categoryName]) {
            categorizedProducts[categoryName] = [];
        }
        categorizedProducts[categoryName].push(product);
    }

    return (
        <div>
            {Object.entries(categorizedProducts).map(([categoryName, categoryProducts]) => (
                <div key={categoryName}>
                    <div className="product-detail-heading products-page-heading">
                        <h1>{categoryName}</h1>
                        <div className="horizontal-bar"></div>
                    </div>
                    <div className="products-page-container">
                        {categoryProducts.map(product => (
                            <ProductPageItem key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export const getStaticProps = async () => {
    const productsQuery = `
  *[_type == "products"]{
    ...,
    productCategory->{
      title
    }
  }
`;
    const products = await client.fetch(productsQuery);

    return {
        props: { products }
    }
}

export default ProductsPageItem;
