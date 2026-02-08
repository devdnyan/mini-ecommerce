import type { data } from "../assets/dummy"
import { useCart } from "../Context/CartContext";

interface CardProps {
    data: data
}
export default function Card({ data }: CardProps) {

    const { addToCart } = useCart();

    return (
        <div className="flex flex-col w-80 border-2 border-gray-800 justify-center items-center rounded-2xl m-4 p-4">
            <div className="w-50 h-50">
                <img 
                    className="w-full h-full object-contain"
                    src={data.image} 
                    alt={data.title}
                 />
            </div>
            <div 
                className="flex flex-1 flex-col justify-center items-start w-full p-4"
            >
                <h2>Title:{data.title}</h2>
                <p>Price: {data.price}</p>
                <p>Rating: {data.rating.rate}</p>
                <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Price</p>
                    <p className="text-lg font-bold text-green-600">${data.price}</p>
                </div>
                <button 
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => addToCart({ id: data.id, name: data.title, image: data.image, price: data.price })}
                >
                        Add to Cart
                </button>
            </div>
        </div>
    )
}