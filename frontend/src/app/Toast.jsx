import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

const styles = {
  loading: "border-[#8b6cf1]/35 bg-[#211b2d]/95 text-[#d8d0ff]",
  success: "border-emerald-400/25 bg-[#16251f]/95 text-emerald-100",
  error: "border-red-400/25 bg-[#2a171d]/95 text-red-100",
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "loading", options = {}) => {
    const id = options.id || `${Date.now()}`;
    const duration = options.duration ?? (type === "loading" ? null : 2600);

    setToast({ id, message, type });

    if (duration) {
      window.setTimeout(() => {
        setToast((current) => (current?.id === id ? null : current));
      }, duration);
    }

    return id;
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed left-1/2 top-5 z-[100] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2">
        {toast && (
          <div className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 py-3 text-sm font-light shadow-[0_18px_55px_rgba(0,0,0,0.35)] backdrop-blur-xl ${styles[toast.type] || styles.loading}`}>
            <span className={`size-2 shrink-0 rounded-full ${
              toast.type === "success" ? "bg-emerald-300" : toast.type === "error" ? "bg-red-300" : "bg-[#a68cff]"
            }`} />
            <span className="leading-5">{toast.message}</span>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
};
