import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type StoredUser = AuthUser & {
  passwordHash: string;
  createdAt: string;
};

type SignInPayload = {
  emailOrName: string;
  password: string;
};

type SignUpPayload = {
  name: string;
  email: string;
  password: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (payload: SignInPayload) => Promise<{ ok: boolean; message?: string }>;
  signUp: (payload: SignUpPayload) => Promise<{ ok: boolean; message?: string }>;
  logout: () => void;
};

const USERS_KEY = 'moodfix_users';
const SESSION_KEY = 'moodfix_session';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const normalize = (value: string) => value.trim().toLowerCase();

const hashPassword = async (password: string) => {
  if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
    return password;
  }

  const encoder = new TextEncoder();
  const buffer = await window.crypto.subtle.digest('SHA-256', encoder.encode(password));
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

const readUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const readSession = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeSession = (user: AuthUser | null) => {
  if (!user) {
    localStorage.removeItem(SESSION_KEY);
    return;
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = readSession();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  const signUp = async ({ name, email, password }: SignUpPayload) => {
    try {
      const trimmedName = name.trim();
      const trimmedEmail = normalize(email);

      if (!trimmedName) {
        return { ok: false, message: 'Name is required.' };
      }

      if (!trimmedEmail || !trimmedEmail.includes('@')) {
        return { ok: false, message: 'Please enter a valid email.' };
      }

      if (password.length < 8) {
        return { ok: false, message: 'Password must be at least 8 characters long.' };
      }

      const users = readUsers();
      const exists = users.some(
        (storedUser) => normalize(storedUser.email) === trimmedEmail || normalize(storedUser.name) === normalize(trimmedName)
      );

      if (exists) {
        return { ok: false, message: 'An account with this email or name already exists.' };
      }

      const passwordHash = await hashPassword(password);
      const nextUser: StoredUser = {
        id: crypto.randomUUID(),
        name: trimmedName,
        email: trimmedEmail,
        passwordHash,
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [...users, nextUser];
      writeUsers(updatedUsers);

      const sessionUser: AuthUser = {
        id: nextUser.id,
        name: nextUser.name,
        email: nextUser.email,
      };

      writeSession(sessionUser);
      setUser(sessionUser);

      return { ok: true, message: 'Account created successfully.' };
    } catch {
      return { ok: false, message: 'Something went wrong while creating the account.' };
    }
  };

  const signIn = async ({ emailOrName, password }: SignInPayload) => {
    try {
      const normalizedInput = normalize(emailOrName);

      if (!normalizedInput) {
        return { ok: false, message: 'Email or name is required.' };
      }

      if (!password) {
        return { ok: false, message: 'Password is required.' };
      }

      const users = readUsers();
      const userToLogin = users.find(
        (storedUser) =>
          normalize(storedUser.email) === normalizedInput || normalize(storedUser.name) === normalizedInput
      );

      if (!userToLogin) {
        return { ok: false, message: 'Invalid email/name or password.' };
      }

      const hashedInput = await hashPassword(password);
      if (userToLogin.passwordHash !== hashedInput) {
        return { ok: false, message: 'Invalid email/name or password.' };
      }

      const sessionUser: AuthUser = {
        id: userToLogin.id,
        name: userToLogin.name,
        email: userToLogin.email,
      };

      writeSession(sessionUser);
      setUser(sessionUser);

      return { ok: true, message: 'Signed in successfully.' };
    } catch {
      return { ok: false, message: 'Something went wrong while signing in.' };
    }
  };

  const logout = () => {
    writeSession(null);
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      signIn,
      signUp,
      logout,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
