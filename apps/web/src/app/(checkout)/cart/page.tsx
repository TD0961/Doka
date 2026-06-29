'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ArrowRight, ShieldCheck, Truck, Bookmark, Tag } from 'lucide-react';
import styles from './Cart.module.css';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  design: string;
  image: string;
  savedForLater?: boolean;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'Premium Heavyweight Hoodie', price: 55.00, quantity: 1, color: 'Black', size: 'L', design: 'Custom Logo (Front)', image: '/hoodie.png' },
    { id: '2', name: 'Classic Organic T-Shirt', price: 24.00, quantity: 2, color: 'White', size: 'M', design: 'No Customization', image: '/tshirt.png' },
  ]);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  const activeCart = cartItems.filter(i => !i.savedForLater);
  const subtotal = activeCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = appliedCoupon === 'DOKA10' ? subtotal * 0.1 : 0;
  const shipping = (subtotal - discount) > 75 ? 0 : 8.50;
  const total = subtotal - discount + shipping;

  const updateQty = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => setCartItems(prev => prev.filter(i => i.id !== id));

  const saveForLater = (id: string) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      setCartItems(prev => prev.filter(i => i.id !== id));
      setSavedItems(prev => [...prev, item]);
    }
  };

  const moveToCart = (id: string) => {
    const item = savedItems.find(i => i.id === id);
    if (item) {
      setSavedItems(prev => prev.filter(i => i.id !== id));
      setCartItems(prev => [...prev, item]);
    }
  };

  const applyCoupon = () => {
    if (coupon === 'DOKA10') {
      setAppliedCoupon(coupon);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code.');
      setAppliedCoupon('');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Your Cart</h1>

      <div className={styles.layout}>
        <div className={styles.mainContent}>
          {activeCart.length === 0 && savedItems.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any products yet.</p>
              <Link href="/" className={styles.continueBtn}>Start Shopping</Link>
            </div>
          ) : (
            <>
              {activeCart.length > 0 && (
                <div className={styles.cartList}>
                  {activeCart.map(item => (
                    <div key={item.id} className={styles.cartItem}>
                      <div className={styles.itemImage}>
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill className={styles.imgEl} />
                        ) : (
                          <div className={styles.placeholder} />
                        )}
                      </div>
                      <div className={styles.itemInfo}>
                        <div className={styles.itemHeader}>
                          <Link href={`/product/${item.id}`} className={styles.itemName}>{item.name}</Link>
                          <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <div className={styles.itemDetails}>
                          <span>Color: {item.color}</span>
                          <span>Size: {item.size}</span>
                          <span className={styles.designBadge}>{item.design}</span>
                        </div>
                        <div className={styles.itemActions}>
                          <div className={styles.quantitySelector}>
                            <button className={styles.qtyBtn} onClick={() => updateQty(item.id, -1)}>-</button>
                            <span className={styles.qtyValue}>{item.quantity}</span>
                            <button className={styles.qtyBtn} onClick={() => updateQty(item.id, 1)}>+</button>
                          </div>
                          <div className={styles.itemBtns}>
                            <button className={styles.saveBtn} onClick={() => saveForLater(item.id)}>
                              <Bookmark size={14} /> Save for later
                            </button>
                            <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>
                              <Trash2 size={14} /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {savedItems.length > 0 && (
                <div className={styles.savedSection}>
                  <h2 className={styles.savedTitle}>Saved for Later ({savedItems.length})</h2>
                  <div className={styles.savedList}>
                    {savedItems.map(item => (
                      <div key={item.id} className={styles.savedItem}>
                        <div className={styles.savedImg}>
                          {item.image ? (
                            <Image src={item.image} alt={item.name} fill className={styles.imgEl} />
                          ) : (
                            <div className={styles.placeholder} />
                          )}
                        </div>
                        <div className={styles.savedInfo}>
                          <span className={styles.itemName}>{item.name}</span>
                          <span className={styles.price}>${item.price.toFixed(2)}</span>
                        </div>
                        <button className={styles.moveToCartBtn} onClick={() => moveToCart(item.id)}>
                          Move to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {activeCart.length > 0 && (
          <div className={styles.sidebar}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              {/* Coupon */}
              <div className={styles.couponRow}>
                <Tag size={16} className={styles.couponIcon} />
                <input
                  type="text"
                  placeholder="Coupon code (try DOKA10)"
                  className={styles.couponInput}
                  value={coupon}
                  onChange={e => setCoupon(e.target.value.toUpperCase())}
                />
                <button className={styles.applyBtn} onClick={applyCoupon}>Apply</button>
              </div>
              {couponError && <p className={styles.couponError}>{couponError}</p>}
              {appliedCoupon && <p className={styles.couponSuccess}>✓ 10% discount applied!</p>}

              <div className={styles.divider} />

              <div className={styles.summaryRow}>
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                  <span>Discount (DOKA10)</span><span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className={styles.summaryRow}>
                <span>Estimated Shipping</span>
                <span>{shipping === 0 ? <span className={styles.freeShipping}>Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div className={styles.divider} />

              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>

              <Link href="/checkout" className={styles.checkoutBtn}>
                Proceed to Checkout <ArrowRight size={18} />
              </Link>
            </div>

            <div className={styles.trustBadges}>
              <div className={styles.badge}><ShieldCheck size={18} className={styles.badgeIcon} /><span>Secure Checkout</span></div>
              <div className={styles.badge}><Truck size={18} className={styles.badgeIcon} /><span>Free shipping over $75</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
