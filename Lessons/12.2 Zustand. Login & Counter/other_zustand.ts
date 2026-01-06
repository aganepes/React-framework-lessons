//!  Bu yöntem hem temizdir hem de sadece data veya fetchData değişirse render eder.
import { useShallow } from 'zustand/react/shallow'
const { data, fetchData } = useStore(
  useShallow((state) => ({ data: state.data, fetchData: state.fetchData }))
);

//! Zustand'ın useEffect Benzeri Özellikleri (Subscribe)
// Zustand içinde bir değişken değiştiğinde bir işlem yapmak istiyorsanız (yani useEffect'in bağımlılık dizisi gibi davranmasını istiyorsanız), Zustand'ın subscribe özelliğini kullanabilirsiniz:
useStore.subscribe(
  (state) => state.points, // İzlenecek değer
  (points, previousPoints) => {
    console.log("Puan değişti!", points);
    // Burada yan etkileri (side effects) yönetebilirsiniz.
  }
);

// !  --- 1    main 
const useStore = create((set) => {
  
  // 1. Fonksiyonu tanımla
  const main = async () => {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();
    set({ data: data }); // State'i güncelle
  };

  // 2. Hemen çalıştır (Sadece store ilk oluştuğunda 1 kez çalışır)
  main();

  return {
    data: null,
    fetchData: main, // İstersen dışarıdan tekrar çağrılabilir yap
  };
});
// ! ---  2
const useStore = create((set) => ({
  data: 0,
  // ...
}));

// Store oluştuktan hemen sonra dışarıdan müdahale
useStore.getState().main();

// ! ---  3
// Store sadece tanımlar
const useStore = create((set) => ({
  data: null,
  main: async () => {
    const res = await fetch('...');
    set({ data: await res.json() });
  }
}));

// Component tetikler
function App() {
  const main = useStore(state => state.main);

  useEffect(() => {
    main(); // Uygulama başladığında temiz bir şekilde çalışır
  }, [main]);
}


// ?  Yöntem: Persist Middleware (Otomatik ve Tavsiye Edilen)

// Zustand'ın persist özelliği, store içindeki verileri otomatik olarak localStorage'a kaydeder ve sayfa yenilendiğinde oradan geri yükler. Sizin ekstra bir getItem veya setItem yazmanıza gerek kalmaz.

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      points: 0,
      addPoint: () => set((state) => ({ points: state.points + 1 })),
      reset: () => set({ points: 0 }),
    }),
    {
      name: 'user-storage', // localStorage'daki anahtar ismi (key)
      storage: createJSONStorage(() => localStorage), // Tarayıcı hafızasını kullan
    }
  )
);

// Bu yöntemin avantajları:
// Sayfa yenilense de points değeri kaybolmaz.
// Veri tipi (number, object, array) korunur; JSON parse işlemleriyle uğraşmazsınız.
// Sadece belirttiğiniz name üzerinden tüm store yönetilir.


//! Önemli Bir Fark: AsyncStorage Asenkrondur
// React Native kullanırken veriler diskten okunurken bir "gecikme" olur. Zustand bunu otomatik yönetir ama uygulaman ilk açıldığında veriler diskten gelene kadar (milisaniyeler içinde) başlangıç state'i (default value) görünür. Buna Hydration (verinin yüklenip state ile birleşmesi) denir.

// Eğer verinin yüklenip yüklenmediğini kontrol etmek istersen şunu kullanabilirsin:

const hasHydrated = useStore.persist.hasHydrated(); 

if (!hasHydrated) {
  return <ActivityIndicator />; // Veri yüklenene kadar loading göster
}