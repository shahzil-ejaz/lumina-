import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CategoryFilters } from './components/CategoryFilters';
import { ProductCard } from './components/ProductCard';
import { SkeletonLoader } from './components/SkeletonLoader';
import { parseCSV } from './utils/csvParser';

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRCg49iW_BLFJ6gYXtJtIbZ0TL82-zh4BF9-pLFmwh9c81JiwUZKouLXXGXU2n4kbpaPSAozYP6x9K1/pub?output=csv";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(SHEET_CSV_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        const parsedProducts = parseCSV(csvText);
        setProducts(parsedProducts);
      } catch (err) {
        console.error("Error fetching or parsing CSV:", err);
        setError(`Error: ${err.message || err.toString()}`);
      } finally {
        setLoading(false);
      }
    };

    // If URL is not set yet, just show error immediately instead of failing network request
    if (SHEET_CSV_URL === "YOUR_PUBLISHED_CSV_URL_HERE") {
      setError("Please add your published Google Sheets CSV URL to SHEET_CSV_URL in App.jsx.");
      setLoading(false);
    } else {
      fetchProducts();
    }
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex-grow flex flex-col w-full">
      <Navbar toggleSidebar={toggleSidebar} />
      
      <CategoryFilters 
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        closeSidebar={closeSidebar}
        sidebarOpen={sidebarOpen}
      />

      <main className="w-full px-margin-mobile md:px-margin-desktop pt-32 pb-16">
        {/* Hero Section */}
        {activeCategory === 'All' && (
          <section className="text-center md:text-left mb-32">
            <h1 className="font-display-lg text-display-lg text-on-surface mb-4" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
              Curated Living
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto md:mx-0">
              Discover thoughtfully selected pieces to elevate your everyday spaces. Minimalist design meets tactile comfort.
            </p>
          </section>
        )}

        {/* Main Content Area */}
        <div id="main-content">
          {loading ? (
            <SkeletonLoader />
          ) : error ? (
            <div className="bg-error-container text-on-error-container p-8 rounded-2xl text-center max-w-lg mx-auto my-12">
              <span className="material-symbols-outlined text-5xl mb-4">error</span>
              <h2 className="font-title-md text-title-md mb-2">Oops! Something went wrong.</h2>
              <p className="font-body-md text-body-md">{error}</p>
            </div>
          ) : (
            <>
              {activeCategory === 'All' ? (
                <>
                  <section className="mb-16">
                    <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6 border-b border-outline-variant pb-2">
                      New Arrivals
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
                      {products.slice(0, 4).map((product, index) => (
                        <ProductCard key={index} product={product} index={index} />
                      ))}
                    </div>
                  </section>
                  
                  {/* Dynamically display up to 2 distinct categories for the homepage view */}
                  {categories.slice(0, 2).map(cat => {
                    const catProducts = products.filter(p => p.category === cat);
                    if (catProducts.length === 0) return null;
                    return (
                      <section key={cat} className="mb-16">
                        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6 border-b border-outline-variant pb-2">
                          {cat}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
                          {catProducts.map((product, index) => (
                            <ProductCard key={index} product={product} index={index} />
                          ))}
                        </div>
                      </section>
                    );
                  })}
                </>
              ) : (
                <>
                  <h2 className="font-display-lg text-display-lg text-on-surface mb-8 capitalize">
                    {activeCategory}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
                    {filteredProducts.map((product, index) => (
                      <ProductCard key={index} product={product} index={index} />
                    ))}
                  </div>
                  {filteredProducts.length === 0 && (
                    <p className="col-span-full text-center py-10 text-on-surface-variant font-body-md">
                      No products found in this category.
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
