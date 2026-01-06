import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-xl">
            Sepetiniz boş
          </p>
          <Link
            to="/cars"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Araçları Görüntüle
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Sepetim
          </h1>
          <button
            onClick={clearCart}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Sepeti Temizle
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {items.map((item) => (
              <div key={item.id} className="p-6 md:flex md:items-center md:justify-between">
                <div className="md:flex md:items-center md:flex-1">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={`${item.brand} ${item.model}`}
                      className="w-full md:w-32 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {item.brand} {item.model}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {item.year} • {item.price.toLocaleString()} ₺
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white w-8 h-8 rounded-lg transition-colors"
                    >
                      -
                    </button>
                    <span className="text-gray-900 dark:text-white font-semibold w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white w-8 h-8 rounded-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {(item.price * item.quantity).toLocaleString()} ₺
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Kaldır
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                Toplam:
              </span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {getTotalPrice().toLocaleString()} ₺
              </span>
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Ödemeye Geç
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


