import Link from 'next/link';
import Image from 'next/image';
import { Star, Truck, ShieldCheck, ChevronRight, Heart, Minus, Plus, Info } from 'lucide-react';
import styles from './ProductDetail.module.css';
import { ProductCard } from '@/components/products/ProductCard';

export default function ProductDetail({ params }: { params: { id: string } }) {
  // Mock data
  const product = {
    id: params.id,
    name: 'Premium Heavyweight Hoodie',
    price: 55.00,
    rating: 4.9,
    reviews: 128,
    description: 'Experience ultimate comfort with our premium heavyweight hoodie. Crafted from 100% organic cotton, this hoodie features a relaxed fit, dropped shoulders, and a spacious kangaroo pocket. Perfect for everyday wear or customizing with your unique designs.',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#052659' },
      { name: 'Heather Grey', hex: '#E5E7EB' },
      { name: 'Forest Green', hex: '#065F46' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    images: ['/hoodie.png', '/hoodie.png', '/hoodie.png', '/hoodie.png'],
    stock: 45,
    printingMethods: ['DTG (Direct to Garment)', 'Embroidery', 'Screen Printing'],
    shipping: { estimate: '3-5 business days', cost: 8.50 }
  };

  const relatedProducts = [
    {
      id: '2',
      name: 'Classic Organic T-Shirt',
      price: 24.00,
      rating: 4.7,
      reviews: 342,
      image: '/tshirt.png',
      colors: ['#FFF', '#000', '#1F4D8F'],
    },
    {
      id: '3',
      name: 'Embroidered Dad Hat',
      price: 18.50,
      rating: 4.8,
      reviews: 89,
      image: '/cap.png',
      colors: ['#021024', '#F5F5DC'],
    }
  ];

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <Link href="/">Hoodies</Link>
        <ChevronRight size={14} />
        <span className={styles.current}>{product.name}</span>
      </nav>

      <div className={styles.main}>
        {/* Image Gallery */}
        <div className={styles.gallery}>
          <div className={styles.thumbnailList}>
            {product.images.map((img, i) => (
              <button key={i} className={styles.thumbnail}>
                <Image src={img} alt={`${product.name} thumbnail`} fill className={styles.imgEl} />
              </button>
            ))}
          </div>
          <div className={styles.mainImage}>
            <Image src={product.images[0]} alt={product.name} fill className={styles.imgEl} priority />
            <button className={styles.favoriteBtn}>
              <Heart size={24} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className={styles.info}>
          <h1 className={styles.title}>{product.name}</h1>
          
          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            <div className={styles.rating}>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={16} fill={star === 5 ? 'transparent' : 'currentColor'} />
                ))}
              </div>
              <span className={styles.reviews}>{product.rating} ({product.reviews} reviews)</span>
            </div>
            <div className={styles.stockBadge}>
              <span className={styles.stockDot} />
              In Stock ({product.stock} available)
            </div>
          </div>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.methodSection}>
            <span className={styles.methodTitle}>Available Printing Methods:</span>
            <div className={styles.methodTags}>
              {product.printingMethods.map(method => (
                <span key={method} className={styles.methodTag}>{method}</span>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3>Color</h3>
              <span className={styles.selectedLabel}>Black</span>
            </div>
            <div className={styles.colorGrid}>
              {product.colors.map(color => (
                <button 
                  key={color.name}
                  className={styles.colorOption}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3>Size</h3>
              <button className={styles.sizeGuideBtn}>Size Guide</button>
            </div>
            <div className={styles.sizeGrid}>
              {product.sizes.map(size => (
                <button key={size} className={styles.sizeOption}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3>Quantity</h3>
            </div>
            <div className={styles.quantitySelector}>
              <button className={styles.qtyBtn}><Minus size={16} /></button>
              <input type="number" defaultValue="1" className={styles.qtyInput} min="1" max={product.stock} />
              <button className={styles.qtyBtn}><Plus size={16} /></button>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href={`/customize/${product.id}`} className={styles.customizeBtn}>
              Customize Design
            </Link>
            <button className={styles.buyBtn}>
              Add to Cart
            </button>
          </div>

          <div className={styles.perks}>
            <div className={styles.perk}>
              <Truck size={20} className={styles.perkIcon} />
              <div>
                <h4>Shipping Estimate: {product.shipping.estimate}</h4>
                <p>Standard shipping: ${product.shipping.cost.toFixed(2)} (Free over $75)</p>
              </div>
            </div>
            <div className={styles.perk}>
              <ShieldCheck size={20} className={styles.perkIcon} />
              <div>
                <h4>Premium Quality</h4>
                <p>100% satisfaction guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.relatedSection}>
        <h2 className={styles.relatedTitle}>You Might Also Like</h2>
        <div className={styles.relatedGrid}>
          {relatedProducts.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
