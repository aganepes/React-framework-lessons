import { Link } from 'react-router-dom';
import { useCarsStore } from '../stores/carsStore';
import { useEffect } from 'react';

export default function Home() {
  const { cars, fetchCars, loading } = useCarsStore();

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Hoş Geldiniz
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            En iyi araç koleksiyonunu keşfedin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">Yükleniyor...</p>
            </div>
          ) : cars.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">Henüz araç bulunmuyor.</p>
            </div>
          ) : (
            cars.slice(0, 6).map((car) => (
              <Link
                key={car.id}
                to={`/car/${car.id}`}
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
                    <p className="text-sm text-gray-500 dark:text-gray-500 line-clamp-2">
                      {car.description}
                    </p>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="text-center">
          <Link
            to="/cars"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Tüm Araçları Görüntüle
          </Link>
        </div>
      </div>
    </div>
  );
}


