import toast from 'react-hot-toast';

// Base toast config for your app theme
export const toastConfig = {
  duration: 3000,
  position: 'top-right',
  style: {
    background: '#121238', 
    color: '#E0E0E0', 
    padding: '16px',
    borderRadius: '8px',
    fontFamily: "'Poppins', sans-serif",
    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
    border: '1px solid #404066', 
  },
};

export const showSuccessToast = (message) => {
  toast.success(message, {
    ...toastConfig,
    icon: '✅',
    style: {
      ...toastConfig.style,
      border: '1px solid rgb(108, 99, 255)', 
    },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    ...toastConfig,
    icon: '❌',
    style: {
      ...toastConfig.style,
      border: '1px solid #ca462a', 
    },
  });
};

export const showFailureToast = (message) => {
  toast.error(message, {
    ...toastConfig,
    icon: '⚠️',
    style: {
      ...toastConfig.style,
      border: '1px solid #FACC15', 
    },
  });
};
