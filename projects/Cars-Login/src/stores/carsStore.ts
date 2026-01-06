import { create } from 'zustand';
import axios from 'axios';
import type { Car } from '../types/car';

const API_URL = 'http://192.168.30.6:3000';

interface CarsState {
  cars: Car[];
  car: Car | null;
  loading: boolean;
  error: string | null;
  fetchCars: () => Promise<void>;
  fetchCar: (id: string) => Promise<void>;
  addCar: (car: FormData) => Promise<void>;
  updateCar: (id: string, car: FormData) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
}

export const useCarsStore = create<CarsState>((set) => ({
  cars: [],
  car: null,
  loading: false,
  error: null,

  fetchCars: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/cars`);
      set({ cars: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch cars', loading: false });
    }
  },

  fetchCar: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/cars/${id}`);
      set({ car: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch car', loading: false });
    }
  },

  addCar: async (carData: FormData) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/cars`, carData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({ cars: [...state.cars, response.data], loading: false }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to add car', loading: false });
      throw error;
    }
  },

  updateCar: async (id: string, carData: FormData) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/cars/${id}`, carData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        cars: state.cars.map((car) => (car.id === id ? response.data : car)),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to update car', loading: false });
      throw error;
    }
  },

  deleteCar: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        cars: state.cars.filter((car) => car.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to delete car', loading: false });
      throw error;
    }
  },
}));

