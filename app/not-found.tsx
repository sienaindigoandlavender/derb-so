export default function NotFound() {
  return (
    <div style={{
      background: '#1c1917',
      color: '#f5f0e8',
      padding: '6rem 2rem',
      textAlign: 'center',
      minHeight: '50vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.55rem',
        fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#c45a3c',
        marginBottom: '1.5rem',
      }}>
        404
      </p>
      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '2.5rem',
        fontWeight: 400,
        letterSpacing: '-0.02em',
        marginBottom: '1rem',
      }}>
        Lost in the derb
      </h1>
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: '1rem',
        opacity: 0.45,
        marginBottom: '2.5rem',
      }}>
        This page doesn&apos;t exist, or it moved without telling anyone.
      </p>
      <a
        href="/"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.8rem',
          color: '#c45a3c',
          transition: 'opacity 0.2s',
        }}
      >
        ← Back to Derb
      </a>
    </div>
  );
}
