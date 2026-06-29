import Link from 'next/link';

export default function HelpPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 20px', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Help Center</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
        Browse our FAQs or get in touch with our team if you need assistance with your orders, designs, or account.
      </p>
      <Link href="/" style={{ color: 'var(--color-brand)', fontWeight: 'bold' }}>&larr; Back to Home</Link>
    </div>
  );
}
