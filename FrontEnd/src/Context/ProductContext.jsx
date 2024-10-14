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
	const [searchString, setSearchString] = useState('');
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [products, setProducts] = useState(initialProducts);
	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize, setPageSize] = useState(2);
	const [hasMore, setHasMore] = useState(true); // To handle loading more data

	// fetch data
	const { data, error, isLoading, refetch } = useProducts(
		searchString,
		selectedCategory,
		pageNumber,
		pageSize,
		hasMore
	);
	const changePageNumber = async (page = null) => {
		if (page) setPageNumber(page);
		else setPageNumber((old) => old + 1);
	};

	useEffect(() => {
		if (data) {
			if (data.count - pageNumber * pageSize <= 0)
				setHasMore(false); // No more data to load
			else setHasMore(true);
			if (pageNumber === 1) {
				setProducts(data.results);
			} else {
				setProducts((old) => [...old, ...data.results]);
			}
		}
	}, [data]);
	useEffect(() => {
		setProducts([]);
		changePageNumber(1).then(() => refetch());
	}, [searchString, selectedCategory]);

	const manageNextPage = () => {
		if (!hasMore) return;
		changePageNumber().then(() => refetch());
	};

	const getProductById = useMemo(
		() => (id) => products.find((product) => product.id === Number(id)),
		[products]
	);

	const removeProductById = (id) => {
		setProducts((prevProducts) =>
			prevProducts.filter((product) => product.id !== Number(id))
		);
	};

	return (
		<ProductContext.Provider
			value={{
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
			}}>
			{children}
		</ProductContext.Provider>
	);
};
