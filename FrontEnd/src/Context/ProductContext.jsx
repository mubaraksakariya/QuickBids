import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import useProducts from '../CustomHooks/useProducts';

// Create a Context for the products
const ProductContext = createContext();

// Custom hook to use the ProductContext
export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children, initialProducts = [] }) => {
	// States for managing search, category, pagination, and loading
	const [searchString, setSearchString] = useState('');
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [products, setProducts] = useState(initialProducts);
	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	// Fetch data using custom hook
	const {
		data,
		error,
		isLoading: isProductFetching,
		refetch,
	} = useProducts(searchString, selectedCategory, pageNumber, pageSize);

	// Fetch new products or append to existing products
	useEffect(() => {
		if (data) {
			setProducts((prevProducts) =>
				pageNumber === 1
					? data.results
					: [...prevProducts, ...data.results]
			);
			setHasMore(data.count > pageNumber * pageSize);
		}
	}, [data, pageNumber, pageSize]);

	// Manage loading state based on fetching status
	useEffect(() => {
		setIsLoading(isProductFetching);
	}, [isProductFetching]);

	// Reset products and refetch when searchString or selectedCategory changes
	useEffect(() => {
		setIsLoading(true);
		setPageNumber(1);
		setProducts([]);
		refetch();
		setIsLoading(false);
	}, [searchString, selectedCategory, refetch]);

	// Function to load the next page of products
	const manageNextPage = () => {
		if (hasMore && !isLoading) {
			setPageNumber((prev) => prev + 1);
		}
	};

	// Get product by ID, memoized for performance
	const getProductById = useMemo(
		() => (id) => products.find((product) => product.id === Number(id)),
		[products]
	);

	// Remove a product by ID
	const removeProductById = (id) => {
		setProducts((prevProducts) =>
			prevProducts.filter((product) => product.id !== Number(id))
		);
	};

	// Provide context values
	const contextValue = useMemo(
		() => ({
			products,
			error,
			isLoading,
			hasMore,
			removeProductById,
			getProductById,
			setSearchString,
			setSelectedCategory,
			refetch,
			manageNextPage,
			setPageSize,
			setPageNumber,
		}),
		[
			products,
			error,
			isLoading,
			hasMore,
			getProductById,
			refetch,
			setSearchString,
			setSelectedCategory,
		]
	);

	return (
		<ProductContext.Provider value={contextValue}>
			{children}
		</ProductContext.Provider>
	);
};
