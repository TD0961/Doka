import Link from 'next/link';

export default function ContactPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 20px', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Contact Us</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
        Have a question or need support? We'd love to hear from you.
        Reach out to our team at <a href="mailto:support@doka.com" style={{ color: 'var(--color-brand)' }}>support@doka.com</a>.
      </p>
      <Link href="/" style={{ color: 'var(--color-brand)', fontWeight: 'bold' }}>&larr; Back to Home</Link>
    </div>
  );
}
