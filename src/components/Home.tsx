// components/HomeClient.tsx
'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import Navbar from '@/components/Navbar';
import { Product } from '@/types/product';

const PRODUCTS_PER_PAGE = 8;

export default function Home({ initialProducts }: { initialProducts: Product[] }) {
    const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (query: string) => {
        setIsSearching(true);
        setSearchQuery(query);

        setTimeout(() => {
            if (query.trim() === '') {
                setFilteredProducts(allProducts);
            } else {
                const filtered = allProducts.filter(product =>
                    product.title.toLowerCase().includes(query.toLowerCase()) || product.description.toLowerCase().includes(query.toLowerCase())
                );
                setFilteredProducts(filtered);
            }
            setCurrentPage(1);
            setIsSearching(false);
        }, 300);
    };

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    return (
        <>
            <Navbar />

            <section className="hero-section">
                <div className="container text-center">
                    <h1 className="display-4 fw-bold mb-4">Discover Amazing Products</h1>
                    <p className="lead mb-4">
                        Browse through our extensive collection of high-quality products.
                    </p>
                </div>
            </section>

            <SearchBar
                onSearch={handleSearch}
                isLoading={isSearching}
                initialValue={searchQuery}
            />

            <section className="py-5">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-12 d-flex justify-content-between align-items-center">
                            <h2 className="h4 mb-0">
                                {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
                            </h2>
                            <span className="text-muted">
                                Showing {currentProducts.length} of {filteredProducts.length} products
                            </span>
                        </div>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-5">
                            <h3>No products found</h3>
                            <button className="btn btn-primary mt-3" onClick={() => handleSearch('')}>
                                View All Products
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="row">
                                {currentProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
