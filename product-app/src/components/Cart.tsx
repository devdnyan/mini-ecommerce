import { useCart } from "../Context/CartContext";

export default function Cart() {
  const { items, addToCart, removeFromCart, removeOneFromCart } = useCart();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>

        {items.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {items.map(item => (
              <li
                key={item.id}
                className="flex items-center space-x-4 bg-white shadow rounded p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>

                  <div className="mt-2">
                    <button onClick={() => addToCart(item)} className="m-1 bg-green-500 text-white px-4 py-1 rounded">
                      +
                    </button>
                    <button onClick={() => removeOneFromCart(item.id)} className="m-1 bg-yellow-500 text-white px-4 py-1 rounded">
                      -
                    </button>
                    <button onClick={() => removeFromCart(item.id)} className="m-1 bg-red-500 text-white px-4 py-1 rounded">
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
