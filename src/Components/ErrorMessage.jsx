// src/components/ErrorMessage.jsx
// Reusable error message component

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div style={{
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '15px 20px',
      borderRadius: '8px',
      margin: '20px 0',
      border: '1px solid #f5c6cb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <strong>⚠️ Error:</strong> {message}
      </div>
      {onRetry && (
        <button 
          onClick={onRetry}
          style={{
            backgroundColor: '#721c24',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}