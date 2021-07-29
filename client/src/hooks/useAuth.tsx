import { useState } from 'react';

export const USER_ID = 'USER_ID';

export default function useAuth(): [
  boolean,
  (userId: string | undefined) => void,
] {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    Boolean(localStorage.getItem(USER_ID)),
  );

  const toggleLogInOut = (userId: string | undefined) => {
    if (isLoggedIn) {
      localStorage.removeItem(USER_ID);
      setIsLoggedIn(false);
    } else {
      if (!userId) return;
      console.log('user ID : ', userId);
      localStorage.setItem(USER_ID, userId);
      setIsLoggedIn(true);
    }
  };

  return [isLoggedIn, toggleLogInOut];
}
