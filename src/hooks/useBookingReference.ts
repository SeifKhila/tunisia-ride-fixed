import { useState, useEffect } from 'react';

export const useBookingReference = () => {
  const [bookingReference, setBookingReference] = useState('');

  useEffect(() => {
    // Always generate a new unique booking reference
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const dateStr = `${year}${month}${day}`;
    
    // Generate a random number between 01-99 with timestamp for uniqueness
    const randomNum = Math.floor(Math.random() * 99) + 1;
    const timestamp = Date.now().toString().slice(-2);
    const paddedNum = (randomNum + parseInt(timestamp)).toString().padStart(2, '0').slice(-2);
    
    const newRef = `GT-${dateStr}-${paddedNum}`;
    setBookingReference(newRef);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(bookingReference);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  };

  return { bookingReference, copyToClipboard };
};