import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: number) => void;
    removeOneFromCart: (id: number) => void;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        async function fetchCartItems() {
            try {
                const response = await fetch(`${API_URL}/cart`);
                const data = await response.json();
                if (response.ok) {
                    setCartItems(data);
                }else{
                    console.error('Failed to fetch cart items');
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }
        fetchCartItems();
    }, []);

    async function addToCart(item: Omit<CartItem, 'quantity'>) {
        try {
            const response = await fetch(`${API_URL}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item }),
            });
            if (response.ok) {
                setCartItems(prev => {
                    const existingItem = prev.find(cartItem => cartItem.id === item.id);
                    if (existingItem) {
                        return prev.map(cartItem =>
                            cartItem.id === item.id
                                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                : cartItem
                        );
                    }
                    return [...prev, { ...item, quantity: 1 }];
                });
            } else {
                console.error('Failed to add item to cart');
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    }

    async function removeFromCart(id: number) {
        try {
            const response = await fetch(`${API_URL}/cart/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setCartItems(prev => prev.filter(item => item.id !== id));
            } else {
                console.error('Failed to remove item from cart');
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    }

    async function removeOneFromCart(id: number) {
        try{
            const response = await fetch(`${API_URL}/cart/${id}`, {
                method: 'PATCH',
            })
            if(response.ok){
                setCartItems((prev) =>  {
                    const existingItem = prev.find(item => item.id === id);
                    if(existingItem){
                        if(existingItem.quantity > 1){
                            return prev.map(item => 
                                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                            );
                        }else{
                            return prev.filter(item => item.id !== id);
                        }
                    }else{
                        console.error('Item not found in cart');
                    }
                    return prev;
                })
            }
        }catch(error){
            console.error('Error removing one item from cart:', error);
        }
    }
    return (
        <CartContext.Provider value={{ items: cartItems, addToCart, removeFromCart, removeOneFromCart }}>
            {children}
        </CartContext.Provider>
    );
}


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}