import { useReducer } from 'react';
import { useCarsStore } from '../stores/carsStore';

interface AddCarState {
  brand: string;
  model: string;
  year: string;
  price: string;
  description: string;
  image: File | null;
}

type AddCarAction =
  | { type: 'SET_BRAND'; payload: string }
  | { type: 'SET_MODEL'; payload: string }
  | { type: 'SET_YEAR'; payload: string }
  | { type: 'SET_PRICE'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string }
  | { type: 'SET_IMAGE'; payload: File | null }
  | { type: 'RESET' };

const initialState: AddCarState = {
  brand: '',
  model: '',
  year: '',
  price: '',
  description: '',
  image: null,
};

const addCarReducer = (state: AddCarState, action: AddCarAction): AddCarState => {
  switch (action.type) {
    case 'SET_BRAND':
      return { ...state, brand: action.payload };
    case 'SET_MODEL':
      return { ...state, model: action.payload };
    case 'SET_YEAR':
      return { ...state, year: action.payload };
    case 'SET_PRICE':
      return { ...state, price: action.payload };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload };
    case 'SET_IMAGE':
      return { ...state, image: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export default function AddCarForm() {
  const [state, dispatch] = useReducer(addCarReducer, initialState);
  const { addCar, loading } = useCarsStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('brand', state.brand);
    formData.append('model', state.model);
    formData.append('year', state.year);
    formData.append('price', state.price);
    if (state.description) formData.append('description', state.description);
    if (state.image) formData.append('image', state.image);

    try {
      await addCar(formData);
      // Formu temizle
      dispatch({ type: 'RESET' });
      alert('Araç başarıyla eklendi!');
    } catch {
      alert('Araç eklenirken bir hata oluştu.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Yeni Araç Ekle
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Marka
            </label>
            <input
              type="text"
              value={state.brand}
              onChange={(e) => dispatch({ type: 'SET_BRAND', payload: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Model
            </label>
            <input
              type="text"
              value={state.model}
              onChange={(e) => dispatch({ type: 'SET_MODEL', payload: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Yıl
            </label>
            <input
              type="number"
              value={state.year}
              onChange={(e) => dispatch({ type: 'SET_YEAR', payload: e.target.value })}
              required
              min="1900"
              max="2025"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fiyat
            </label>
            <input
              type="number"
              value={state.price}
              onChange={(e) => dispatch({ type: 'SET_PRICE', payload: e.target.value })}
              required
              min="0"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Açıklama
          </label>
          <textarea
            value={state.description}
            onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resim
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => dispatch({ type: 'SET_IMAGE', payload: e.target.files?.[0] || null })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {loading ? 'Ekleniyor...' : 'Araç Ekle'}
        </button>
      </form>
    </div>
  );
}

