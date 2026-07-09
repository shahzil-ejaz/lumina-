import React from 'react';
import PropTypes from 'prop-types';

/**
 * ProductCard component
 * A self-contained product card presentation component.
 */
export const ProductCard = ({ product, index }) => {
  return (
    <div
      className="group flex flex-col gap-3 fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-container-low shadow-sm group-hover:shadow-md transition-shadow duration-300">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none"></div>
      </div>
      <div className="flex flex-col gap-1 px-1">
        <h3 className="font-title-md text-label-md md:text-title-md text-on-surface truncate">
          {product.title}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {product.price}
        </p>
      </div>
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto mx-1 py-2.5 px-4 bg-primary/10 hover:bg-primary text-primary hover:text-on-primary rounded-lg font-label-md text-label-md text-center transition-colors duration-200"
      >
        Shop Now
      </a>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number,
};

ProductCard.defaultProps = {
  index: 0,
};
