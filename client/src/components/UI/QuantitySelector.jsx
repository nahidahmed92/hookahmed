import { useState } from 'react';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(0);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  return (
    <div className="quantity-selector">
      {quantity > 0 && (
        <button onClick={decrement} className="btn btn-outline-danger">
          <i className="bi bi-dash-circle-fill"></i>
        </button>
      )}

      <span className="mx-2">{quantity}</span>
      <button onClick={increment} className="btn btn-outline-primary">
        <i className="bi bi-plus-circle-fill"></i>
      </button>
    </div>
  );
}
