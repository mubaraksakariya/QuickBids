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

// Provider component to wrap around the children
export const ProductProvider = ({ children, initialProducts = [] }) => {
	const [searchString, setSearchString] = useState('');
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [products, setProducts] = useState(initialProducts);
	// fetch data
	const { data, error, isLoading, refetch } = useProducts(
		searchString,
		selectedCategory
	);

	useEffect(() => {
		if (data) {
			setProducts(data);
		}
	}, [data]);

	const getProductById = useMemo(
		() => (id) => {
			return products?.find((product) => product.id === Number(id));
		},
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
				removeProductById,
				getProductById,
				setSearchString,
				setSelectedCategory,
				refetch,
			}}>
			{children}
		</ProductContext.Provider>
	);
};
