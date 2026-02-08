import { useCart } from "../Context/CartContext";

type Props = {
    view: string;
    setView: React.Dispatch<React.SetStateAction<string>>;
}

export default function NavBar({ view, setView }: Props) {
    const { items } = useCart();

    function handleCartClick() {
        if (view === 'cart') {
            setView('products');
            return;
        }
        setView('cart');
    }

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1>Mini E-commerce</h1>
            <button
                onClick={handleCartClick}
                className="bg-yellow-500 py-2 px-4 text-black border-amber-400 rounded-3xl mx-2">
                Cart ({items.length})
            </button>
        </nav>
    )
}