import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { loadMoreProducts } from '../redux/productSlice';
import { addToCart, toggleCartVisibility } from '../redux/cartSlice';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Products.css';
const fetchProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Products = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.carts) || [];
  const cartItemsCount = cartItems.length;
  const isVisible = useSelector((state) => state.cart.isVisible); 
  const visibleProducts = useSelector((state) => state.products.visibleProducts); 
  const { data: products = [], error, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const handleLoadMore = () => {
    dispatch(loadMoreProducts());
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1, totalPrice: product.price }));
  };

  const handleCartIconClick = () => {
    dispatch(toggleCartVisibility());
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.error("Error fetching products:", error);
    return <p>Error: {error.message}</p>;
  }

  if (!products.length) {
    return <p>No products available</p>;
  }

  return (
    <div>
      <header className="header">
        <div className="header-left">
         <h3>E-comerce</h3>
        </div>
        <div className="header-right">
          <div className="cart-icon" onClick={handleCartIconClick}>
            <AiOutlineShoppingCart />
            {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
          </div>
        </div>
      </header>
      <div className="products-container">
        {products.slice(0, visibleProducts).map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.title}</h3>
            <img src={product.image} alt={product.title} />
            <p>${product.price}</p>
            <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {products.length > visibleProducts && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default Products;
