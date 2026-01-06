import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCarsStore } from '../stores/carsStore';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { useEffect } from 'react';

export default function Car() {
  const { id } = useParams<{ id: string }>();
  const { car, fetchCar, loading, deleteCar } = useCarsStore();
  const { addToCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCar(id);
    }
  }, [id, fetchCar]);

  const handleDelete = async () => {
    if (id && window.confirm('Bu aracı silmek istediğinizden emin misiniz?')) {
      await deleteCar(id);
      navigate('/cars');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">Yükleniyor...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Araç bulunamadı.</p>
          <Link
            to="/cars"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Araçlara Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <Link
          to="/cars"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 mb-4 inline-block"
        >
          ← Araçlara Dön
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {car.image && (
              <div className="md:w-1/2">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className={`p-8 ${car.image ? 'md:w-1/2' : 'w-full'}`}>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {car.brand} {car.model}
              </h1>
              <div className="space-y-4 mb-6">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Yıl: </span>
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {car.year}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Fiyat: </span>
                  <span className="text-gray-900 dark:text-white font-semibold text-2xl">
                    {car.price.toLocaleString()} ₺
                  </span>
                </div>
                {car.description && (
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Açıklama: </span>
                    <p className="text-gray-900 dark:text-white mt-2">
                      {car.description}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => addToCart(car)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Sepete Ekle
                </button>
                {isAuthenticated && (
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Sil
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


