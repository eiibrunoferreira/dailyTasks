import React, { useEffect, useState } from 'react';

export default function ToastModal({
  show,
  message,
  type = 'error',
  duration = 1700,
  onClose,
}) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setExiting(false);

      const timer = setTimeout(() => {
        setExiting(true);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  // Quando a animação de saída termina
  const handleAnimationEnd = () => {
    if (exiting) {
      setVisible(false);
      setExiting(false);
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50">
      <div
        onAnimationEnd={handleAnimationEnd}
        className={`
          px-5 py-3 rounded-xl shadow-xl text-white bg-slate-800 border-b-4
          max-w-md w-fit text-center
          whitespace-nowrap overflow-hidden
          ${type === 'error' && 'border-amber-700'}
          ${type === 'success' && 'border-green-700'}
          ${exiting ? 'toast-exit' : 'toast-enter'}
        `}
      >
        {message}
      </div>
    </div>
  );
}
