import { useProducts, useCategories } from '../hooks/useProducts';
import { useProductFilter } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
const Home = () => {
  const { products, loading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  
  const {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    clearFilters
  } = useProductFilter(products);

  if (productsLoading) {
    return <LoadingSpinner size="lg" message="Loading products..." />;
  }

  if (productsError) {
    return (
      <ErrorMessage 
        message={productsError} 
        onRetry={refetchProducts}
      />
    );
  }

  const hasActiveFilters = searchTerm || selectedCategory;
  const resultCount = filteredProducts.length;

  return (
    <div className="space-y-6">
      
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Discover Amazing Products
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through our curated collection of high-quality products at unbeatable prices.
        </p>
      </div>

      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>

          <div className="w-full md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              disabled={categoriesLoading}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category} className="capitalize">
                  {category.replace(/['"]+/g, '').replace(/-/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <div>
            Showing <span className="font-medium">{resultCount}</span> of{' '}
            <span className="font-medium">{products.length}</span> products
            {hasActiveFilters && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                Filtered
              </span>
            )}
          </div>
        </div>
      </div>

      {resultCount === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            {hasActiveFilters 
              ? "Try adjusting your search or filter criteria"
              : "No products available at the moment"
            }
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;