import { useEffect, useState } from 'react'
import type { data } from '../assets/dummy';
import Card from './Card'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Products() {
    const [products, setProducts] = useState<data[]>([]);


    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(`${API_URL}/products`);
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'>
            {products.map((item) => {
                return <Card key={item.id} data={item} />
            })}
        </div>
    )
}