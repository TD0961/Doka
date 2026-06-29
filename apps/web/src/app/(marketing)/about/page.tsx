import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Package, Zap, Gem } from 'lucide-react';
import styles from './About.module.css';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}><Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} /> Premium Print-on-Demand</span>
          <h1 className={styles.title}>
            Create and sell custom products online
          </h1>
          <p className={styles.subtitle}>
            Turn your ideas into premium products. We handle the printing, packing, and shipping so you can focus on building your brand.
          </p>
          
          <div className={styles.actions}>
            <Link href="/register" className={styles.primaryBtn}>
              Start for free <ArrowRight size={18} />
            </Link>
            <Link href="/" className={styles.secondaryBtn}>
              Browse catalog
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroImgWrapper}>
            <Image src="/hoodie.png" alt="Doka Products" fill className={styles.heroBgImg} priority />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className={styles.socialProof}>
        <h3 className={styles.socialProofText}>Trusted by modern creator brands</h3>
        <div className={styles.socialProofLogos}>
          <span className={styles.socialLogo}>Spotify</span>
          <span className={styles.socialLogo}>Twitch</span>
          <span className={styles.socialLogo}>YouTube</span>
          <span className={styles.socialLogo}>Discord</span>
          <span className={styles.socialLogo}>TikTok</span>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.catalogSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Bestselling Products</h2>
          <p className={styles.sectionSubtitle}>Start selling with our most popular blanks, loved by creators worldwide.</p>
        </div>
        
        <div className={styles.catalogGrid}>
          <Link href="/product/1" className={styles.productCard}>
            <div className={styles.productImgWrapper}>
              <Image src="/hoodie.png" alt="Heavyweight Hoodie" fill className={styles.productImg} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>Heavyweight Hoodie</h3>
              <div className={styles.productDetails}>
                <span>100% Cotton</span>
                <span className={styles.productPrice}>From $35.00</span>
              </div>
            </div>
          </Link>
          
          <Link href="/product/2" className={styles.productCard}>
            <div className={styles.productImgWrapper}>
              <Image src="/tshirt.png" alt="Classic T-Shirt" fill className={styles.productImg} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>Classic T-Shirt</h3>
              <div className={styles.productDetails}>
                <span>Organic Blends</span>
                <span className={styles.productPrice}>From $14.50</span>
              </div>
            </div>
          </Link>
          
          <Link href="/product/3" className={styles.productCard}>
            <div className={styles.productImgWrapper}>
              <Image src="/mug.png" alt="Ceramic Mug" fill className={styles.productImg} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>Ceramic Mug</h3>
              <div className={styles.productDetails}>
                <span>11oz & 15oz</span>
                <span className={styles.productPrice}>From $7.00</span>
              </div>
            </div>
          </Link>
          
          <Link href="/product/4" className={styles.productCard}>
            <div className={styles.productImgWrapper}>
              <Image src="/phonecase.png" alt="Tough Phone Case" fill className={styles.productImg} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>Tough Phone Case</h3>
              <div className={styles.productDetails}>
                <span>Glossy or Matte</span>
                <span className={styles.productPrice}>From $12.50</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why choose Doka?</h2>
          <p className={styles.sectionSubtitle}>We built our platform from the ground up to give you the highest quality products and the best experience.</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}><Gem size={32} /></div>
            <h3 className={styles.featureTitle}>Premium Quality</h3>
            <p className={styles.featureDesc}>We source only the best materials. Our heavyweight hoodies and organic cotton tees are built to last and feel incredible.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}><Zap size={32} /></div>
            <h3 className={styles.featureTitle}>Lightning Fast</h3>
            <p className={styles.featureDesc}>Most orders are printed and shipped within 48 hours. Fast fulfillment means happier customers for your brand.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}><Package size={32} /></div>
            <h3 className={styles.featureTitle}>No Minimums</h3>
            <p className={styles.featureDesc}>Whether you want to print a single custom mug or 1,000 t-shirts, you get the same premium treatment with zero upfront inventory costs.</p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className={styles.stepsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <p className={styles.sectionSubtitle}>Launch your custom product line in minutes, not months.</p>
        </div>
        
        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={styles.stepImg}>
              <Image src="/hoodie.png" alt="Select Product" fill className={styles.stepImgEl} />
            </div>
            <div className={styles.stepContent}>
              <div className={styles.stepNum}>1</div>
              <h3 className={styles.stepTitle}>Pick a product</h3>
              <p className={styles.stepDesc}>Browse our catalog of premium apparel, accessories, and home goods. We've curated only the highest quality blanks from sustainable suppliers.</p>
            </div>
          </div>
          
          <div className={styles.step}>
            <div className={styles.stepImg}>
              <Image src="/tshirt.png" alt="Customize" fill className={styles.stepImgEl} />
            </div>
            <div className={styles.stepContent}>
              <div className={styles.stepNum}>2</div>
              <h3 className={styles.stepTitle}>Make it yours</h3>
              <p className={styles.stepDesc}>Use our powerful web-based design editor to upload artwork, add typography, adjust colors, and perfectly position your graphics on the product.</p>
            </div>
          </div>
          
          <div className={styles.step}>
            <div className={styles.stepImg}>
              <Image src="/phonecase.png" alt="Ship" fill className={styles.stepImgEl} />
            </div>
            <div className={styles.stepContent}>
              <div className={styles.stepNum}>3</div>
              <h3 className={styles.stepTitle}>We print & ship</h3>
              <p className={styles.stepDesc}>When an order is placed, we automatically route it to the nearest printing facility, fulfill it using cutting-edge tech, and ship it directly to your customer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className={styles.integrationsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Connect Your Store</h2>
          <p className={styles.sectionSubtitle}>Doka integrates seamlessly with the platforms you already use.</p>
        </div>
        <div className={styles.integrationsGrid}>
          <div className={styles.integrationCard}>Shopify</div>
          <div className={styles.integrationCard}>Etsy</div>
          <div className={styles.integrationCard}>WooCommerce</div>
          <div className={styles.integrationCard}>Wix</div>
          <div className={styles.integrationCard}>Squarespace</div>
          <div className={styles.integrationCard}>Custom API</div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Ready to launch your brand?</h2>
          <p className={styles.ctaDesc}>Join thousands of creators who are building their merchandise empires on Doka.</p>
          <Link href="/register" className={styles.ctaBtn}>
            Create Free Account <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
