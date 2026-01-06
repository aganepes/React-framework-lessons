import { Link } from 'react-router-dom';
import { useCarsStore } from '../stores/carsStore';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import AddCarForm from '../components/AddCarForm';
import { useEffect, useReducer } from 'react';

interface CarsState {
  searchTerm: string;
}

type CarsAction = { type: 'SET_SEARCH_TERM'; payload: string };

const initialState: CarsState = {
  searchTerm: '',
};

const carsReducer = (state: CarsState, action: CarsAction): CarsState => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

export default function Cars() {
  const { cars, fetchCars, loading, deleteCar } = useCarsStore();
  const { addToCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [state, dispatch] = useReducer(carsReducer, initialState);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const filteredCars = cars.filter(
    (car) =>
      car.brand.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(state.searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu aracı silmek istediğinizden emin misiniz?')) {
      await deleteCar(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {isAuthenticated && <AddCarForm />}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Araçlar
          </h1>
          <input
            type="text"
            placeholder="Araç ara..."
            value={state.searchTerm}
            onChange={(e) => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">Yükleniyor...</p>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              {state.searchTerm ? 'Arama sonucu bulunamadı.' : 'Henüz araç bulunmuyor.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {car.image && (
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {car.year} • {car.price.toLocaleString()} ₺
                  </p>
                  {car.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-4 line-clamp-2">
                      {car.description}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Link
                      to={`/car/${car.id}`}
                      className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Detaylar
                    </Link>
                    <button
                      onClick={() => addToCart(car)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Sepete Ekle
                    </button>
                    {isAuthenticated && (
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Sil
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

