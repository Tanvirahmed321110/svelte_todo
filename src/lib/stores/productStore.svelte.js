// lib/stores/productStore.svelte.js

import { products as initialProducts } from '#lib/data/products.js';

let products = $state([...initialProducts]);

export function getProducts() {
    return products;
}

export function addProduct(data) {
    const newProduct = {
        id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
        qty: 1,
        stock: 10,
        ...data
    };

    products.push(newProduct);
    return newProduct;
}
