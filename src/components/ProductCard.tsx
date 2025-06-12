'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { Star, StarHalf } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="rating-stars" size={16} fill="currentColor" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="rating-stars" size={16} fill="currentColor" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-muted" size={16} />);
    }

    return stars;
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card product-card h-100">
        <div className="position-relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={250}
            className="card-img-top product-image w-100"
            style={{ objectFit: 'contain' }}
            unoptimized
          />
          <span className="badge bg-primary position-absolute top-0 end-0 m-2 category-badge">
            {product.category}
          </span>
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="product-title">{product.title}</h5>
          <div className="mb-2">
            <div className="d-flex align-items-center mb-1">
              {renderStars(product.rating.rate)}
              <span className="ms-1 text-muted small">({product.rating.count})</span>
            </div>
          </div>
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center">
              <span className="price-tag">${product.price.toFixed(2)}</span>
              <Link href={`/product/${product.id}`} className="btn btn-outline-primary btn-sm">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;