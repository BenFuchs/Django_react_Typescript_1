import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://127.0.0.1:8000/';

// Define types for the product data
interface Product {
    id: number;
    name: string;
    price: string;
}

const Products: React.FC = () => {
    // State for products, new product, and edit product
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState<{ name: string; price: string }>({ name: '', price: '' });
    const [editProduct, setEditProduct] = useState<{ id: number | null; name: string; price: string }>({ id: null, name: '', price: '' });
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    // Function to fetch products
    const fetchProducts = async () => {
        try {
            const response = await axios.get<Product[]>(`${SERVER_URL}product/`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Handle product creation
    const handleCreateProduct = async () => {
        try {
            await axios.post(`${SERVER_URL}product/`, newProduct);
            fetchProducts(); // Fetch the updated list of products
            setNewProduct({ name: '', price: '' }); // Clear the form fields
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    // Handle product deletion
    const handleDeleteProduct = async (id: number) => {
        try {
            await axios.delete(`${SERVER_URL}product/${id}`);
            fetchProducts(); // Fetch the updated list of products
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Handle product update
    const handleUpdateProduct = async () => {
        try {
            if (editProduct.id !== null) {  // Ensure an ID is set before attempting to update
                await axios.put(`${SERVER_URL}product/${editProduct.id}`, {
                    name: editProduct.name,
                    price: editProduct.price
                });
                fetchProducts(); // Fetch the updated list of products
                setEditProduct({ id: null, name: '', price: '' }); // Clear the form fields
                setIsEditing(false); // Exit editing mode
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Start editing a product
    const startEditing = (product: Product) => {
        setEditProduct({ id: product.id, name: product.name, price: product.price });
        setIsEditing(true);
    };

    return (
        <div>
            <h1>Products Page</h1>
            <div>
                <h2>Create Product</h2>
                <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Product Name"
                />
                <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="Product Price"
                />
                <button onClick={handleCreateProduct}>Add Product</button>
            </div>
            <div>
                <h2>Product List</h2>
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            {isEditing && editProduct.id === product.id ? (
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editProduct.name}
                                        onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                                        placeholder="Product Name"
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        value={editProduct.price}
                                        onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                                        placeholder="Product Price"
                                    />
                                    <button onClick={handleUpdateProduct}>Save</button>
                                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                                </div>
                            ) : (
                                <>
                                    {product.name} - ${product.price}
                                    <button onClick={() => handleDeleteProduct(product.id)}>DELETE</button>
                                    <button onClick={() => startEditing(product)}>Update</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Products;
