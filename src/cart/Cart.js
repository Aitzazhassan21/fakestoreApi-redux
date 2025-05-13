import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineDelete, AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from 'react-icons/ai';
import { Offcanvas } from 'react-bootstrap';
import { removeFromCart, toggleCartVisibility, toggleCartQty } from '../redux/cartSlice';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.carts);
  const isVisible = useSelector((state) => state.cart.isVisible);

  const handleClose = () => {
    dispatch(toggleCartVisibility());
  };

  const handleToggleQty = (id, type) => {
    dispatch(toggleCartQty({ id, type }));
  };

  return (
    <Offcanvas show={isVisible} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-header">
                  <h3 className="item-name">{item.title}</h3>
                </div>
                <div className="item-details">
                  <p className="quantity">Quantity: {item.quantity}</p>
                  <div className="action-buttons">
                    <button className="icon-button" onClick={() => handleToggleQty(item.id, 'INC')}>
                      <AiOutlinePlus />
                    </button>
                    <button className="icon-button" onClick={() => handleToggleQty(item.id, 'DEC')}>
                      <AiOutlineMinus />
                    </button>
                  </div>
                </div>
                <div className="item-footer">
                  <p className="price">Price: ${item.totalPrice}</p>
                  <button className="delete-button" onClick={() => dispatch(removeFromCart(item.id))}>
                    <AiOutlineDelete />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Offcanvas.Body>

    </Offcanvas>
  );
};

export default Cart;
