export default function LoadingSpinner() {
  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: '5px',
        padding: '1rem',
      }}
    >
      <div
        style={{
          width: '3rem',
          height: '3rem',
          border: '4px solid rgba(229, 231, 235, 1)',
          borderTop: '4px solid rgba(37, 99, 235, 1)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          opacity: 1,
        }}
      ></div>
    </div>
  );
}
