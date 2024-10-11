import React from 'react';
import { useCarouselProducts } from '../../CustomHooks/useCarouselProducts';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CarouselItem from './CarouserItem';
import { useNavigate } from 'react-router-dom';

function HomeCarousel() {
	const { data, isLoading, error } = useCarouselProducts();
	const navigate = useNavigate();
	const manageClick = (item) => {
		navigate(`/product/${item.id}`);
	};
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className='flex justify-center pb-4'>
			<div className='w-full'>
				<Carousel
					autoPlay
					showStatus={false}
					emulateTouch
					centerMode
					centerSlidePercentage={100}
					infiniteLoop={true}
					interval={5000}
					showThumbs={false}
					stopOnHover={false}>
					{data.map(
						(product) =>
							product && (
								<CarouselItem
									product={product}
									key={product.id}
									onClick={manageClick}
								/>
							)
					)}
				</Carousel>
			</div>
		</div>
	);
}

export default HomeCarousel;
