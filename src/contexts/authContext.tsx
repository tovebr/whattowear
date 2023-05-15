import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { User } from 'firebase/auth';
import { Wardrobe } from '../types/types';

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  wardrobe: Wardrobe | null;
  setWardrobe: Dispatch<SetStateAction<Wardrobe | null>>;
  loadingUser: boolean;
  setLoadingUser: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

const AuthProvider = (props: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [wardrobe, setWardrobe] = useState<Wardrobe | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  return (
    <AuthContext.Provider
      {...props}
      value={{
        user,
        setUser,
        loadingUser,
        setLoadingUser,
        wardrobe,
        setWardrobe,
      }}
    />
  );
};

export { AuthProvider, useAuth };
