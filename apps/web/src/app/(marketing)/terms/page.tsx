import Link from 'next/link';

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 20px', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Terms of Service</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
        Please read these terms carefully before using our platform. By using Doka, you agree to these terms.
      </p>
      <Link href="/" style={{ color: 'var(--color-brand)', fontWeight: 'bold' }}>&larr; Back to Home</Link>
    </div>
  );
}
