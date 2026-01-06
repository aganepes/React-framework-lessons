import { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

interface RegisterState {
  name: string;
  email: string;
  password: string;
  error: string;
  loading: boolean;
}

type RegisterAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET' };

const initialState: RegisterState = {
  name: '',
  email: '',
  password: '',
  error: '',
  loading: false,
};

const registerReducer = (state: RegisterState, action: RegisterAction): RegisterState => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export default function Register() {
  const [state, dispatch] = useReducer(registerReducer, initialState);
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_ERROR', payload: '' });
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      await register(state.email, state.password, state.name);
      dispatch({ type: 'RESET' });
      navigate('/');
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: (err as Error).message || 'Kayıt başarısız',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Kayıt Ol
          </h2>
          {state.error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg">
              {state.error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                İsim (Opsiyonel)
              </label>
              <input
                id="name"
                type="text"
                value={state.name}
                onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={state.email}
                onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Şifre
              </label>
              <input
                id="password"
                type="password"
                value={state.password}
                onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={state.loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {state.loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Zaten hesabınız var mı?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

