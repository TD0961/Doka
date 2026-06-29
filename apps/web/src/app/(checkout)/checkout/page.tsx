'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, ChevronLeft, CreditCard, Truck } from 'lucide-react';
import styles from './Checkout.module.css';

type Step = 'information' | 'shipping' | 'payment' | 'review';

const STEPS: { key: Step; label: string }[] = [
  { key: 'information', label: 'Information' },
  { key: 'shipping', label: 'Shipping' },
  { key: 'payment', label: 'Payment' },
  { key: 'review', label: 'Review' },
];

const SHIPPING_METHODS = [
  { id: 'standard', label: 'Standard Shipping', time: '3–5 business days', price: 8.50 },
  { id: 'express', label: 'Express Shipping', time: '1–2 business days', price: 18.00 },
  { id: 'overnight', label: 'Overnight Delivery', time: 'Next business day', price: 32.00 },
];

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>('information');
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const currentStepIdx = STEPS.findIndex(s => s.key === step);

  const shippingCost = SHIPPING_METHODS.find(m => m.id === selectedShipping)?.price ?? 8.50;
  const subtotal = 55.00;
  const total = subtotal + shippingCost;

  const goNext = () => {
    const next = STEPS[currentStepIdx + 1];
    if (next) setStep(next.key);
  };

  const goPrev = () => {
    const prev = STEPS[currentStepIdx - 1];
    if (prev) setStep(prev.key);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>Doka</Link>
        <div className={styles.secureText}><Lock size={14} /><span>Secure Checkout</span></div>
      </header>

      <div className={styles.layout}>
        {/* Left: Form */}
        <div className={styles.main}>
          {/* Progress */}
          <div className={styles.progress}>
            {STEPS.map((s, i) => (
              <div key={s.key} className={styles.progressItem}>
                <div className={`${styles.stepDot} ${i < currentStepIdx ? styles.doneDot : ''} ${i === currentStepIdx ? styles.activeDot : ''}`}>
                  {i < currentStepIdx ? '✓' : i + 1}
                </div>
                <span className={`${styles.stepLabel} ${i === currentStepIdx ? styles.activeLabel : ''}`}>{s.label}</span>
                {i < STEPS.length - 1 && <div className={`${styles.stepLine} ${i < currentStepIdx ? styles.doneLine : ''}`} />}
              </div>
            ))}
          </div>

          {/* Step: Information */}
          {step === 'information' && (
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Contact Information</h2>
              <input type="email" placeholder="Email address" className={styles.input} />

              <h2 className={styles.sectionTitle}>Shipping Address</h2>
              <div className={styles.inputGrid}>
                <input type="text" placeholder="First name" className={styles.input} />
                <input type="text" placeholder="Last name" className={styles.input} />
              </div>
              <input type="text" placeholder="Address" className={styles.input} />
              <input type="text" placeholder="Apartment, suite (optional)" className={styles.input} />
              <div className={styles.inputGrid3}>
                <input type="text" placeholder="City" className={styles.input} />
                <select className={`${styles.input} ${styles.select}`}>
                  <option>State</option><option>California</option><option>New York</option>
                </select>
                <input type="text" placeholder="ZIP code" className={styles.input} />
              </div>

              <div className={styles.actions}>
                <Link href="/cart" className={styles.backLink}><ChevronLeft size={14} /> Return to cart</Link>
                <button className={styles.nextBtn} onClick={goNext}>Continue to Shipping</button>
              </div>
            </div>
          )}

          {/* Step: Shipping */}
          {step === 'shipping' && (
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Delivery Method</h2>
              <div className={styles.shippingOptions}>
                {SHIPPING_METHODS.map(method => (
                  <label key={method.id} className={`${styles.shippingOption} ${selectedShipping === method.id ? styles.selectedOption : ''}`}>
                    <input
                      type="radio"
                      name="shipping"
                      value={method.id}
                      checked={selectedShipping === method.id}
                      onChange={() => setSelectedShipping(method.id)}
                      className={styles.radioInput}
                    />
                    <Truck size={20} className={styles.shippingIcon} />
                    <div className={styles.shippingInfo}>
                      <span className={styles.shippingLabel}>{method.label}</span>
                      <span className={styles.shippingTime}>{method.time}</span>
                    </div>
                    <span className={styles.shippingPrice}>${method.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
              <div className={styles.actions}>
                <button className={styles.backLink} onClick={goPrev}><ChevronLeft size={14} /> Back</button>
                <button className={styles.nextBtn} onClick={goNext}>Continue to Payment</button>
              </div>
            </div>
          )}

          {/* Step: Payment */}
          {step === 'payment' && (
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Payment Method</h2>
              <div className={styles.paymentPlaceholder}>
                <CreditCard size={32} className={styles.paymentIcon} />
                <p className={styles.paymentNote}>Payment processing will be integrated with Stripe or another provider.</p>
                <div className={styles.mockCard}>
                  <input type="text" placeholder="Card number" className={styles.input} />
                  <div className={styles.inputGrid}>
                    <input type="text" placeholder="MM / YY" className={styles.input} />
                    <input type="text" placeholder="CVV" className={styles.input} />
                  </div>
                  <input type="text" placeholder="Name on card" className={styles.input} />
                </div>
              </div>
              <div className={styles.actions}>
                <button className={styles.backLink} onClick={goPrev}><ChevronLeft size={14} /> Back</button>
                <button className={styles.nextBtn} onClick={goNext}>Review Order</button>
              </div>
            </div>
          )}

          {/* Step: Review */}
          {step === 'review' && (
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Review Your Order</h2>
              <div className={styles.reviewCard}>
                <div className={styles.reviewSection}>
                  <span className={styles.reviewSectionLabel}>Shipping to</span>
                  <p>John Doe, 123 Main St, Los Angeles CA 90001</p>
                </div>
                <div className={styles.reviewSection}>
                  <span className={styles.reviewSectionLabel}>Delivery method</span>
                  <p>{SHIPPING_METHODS.find(m => m.id === selectedShipping)?.label} — ${shippingCost.toFixed(2)}</p>
                </div>
                <div className={styles.reviewSection}>
                  <span className={styles.reviewSectionLabel}>Payment</span>
                  <p>•••• •••• •••• 4242</p>
                </div>
              </div>
              <div className={styles.actions}>
                <button className={styles.backLink} onClick={goPrev}><ChevronLeft size={14} /> Back</button>
                <Link href="/success" className={styles.placeOrderBtn}>Place Order — ${total.toFixed(2)}</Link>
              </div>
            </div>
          )}
        </div>

        {/* Right: Summary */}
        <aside className={styles.sidebar}>
          <div className={styles.summaryItems}>
            <div className={styles.item}>
              <div className={styles.itemImgWrapper}>
                <Image src="/hoodie.png" alt="Premium Heavyweight Hoodie" fill className={styles.imgEl} />
                <span className={styles.itemQty}>1</span>
              </div>
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>Premium Heavyweight Hoodie</span>
                <span className={styles.itemDetails}>Black / L</span>
              </div>
              <span className={styles.itemPrice}>$55.00</span>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.totals}>
            <div className={styles.totalRow}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className={styles.totalRow}>
              <span>Shipping</span>
              <span>{step === 'information' ? 'Calculated next' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className={styles.divider} />
            <div className={`${styles.totalRow} ${styles.finalTotal}`}>
              <span>Total</span>
              <div className={styles.totalAmount}>
                <span className={styles.currency}>USD</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
