import { products } from '#lib/data/products.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
    const product = products.find((p) => p.id === Number(params.id));
    if (!product) error(404, 'Product Not found');
    return { product };
}
