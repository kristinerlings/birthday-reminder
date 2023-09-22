/*setItem() 
is used both to add new data item (when no data for given key exists), 
and to modify existing item (when previous data for given key exists).*/

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface BirthdayData {
  name: string;
  message: string;
  date: Date | null;
}

type BirthdayStore = {
  data: BirthdayData[];
  setData: (data: BirthdayData[]) => void;
};

//manage the birthday data
export const useBirthdayStore = create<BirthdayStore>((set) => ({
 
  data: [], // Initialize the array as empty
  setData: (data) => set({ data }),

}));


/* 
const storage = createJSONStorage('zustand');

//manage the birthday data
export const useBirthdayStore = create<BirthdayStore> ({
 persist(
  (set) => ({
  data: [], // Initialize the array as empty
  setData: (data) => set({ data }),
  } ),
  {
    name: 'birthday-storage', // name for my storage
    getStorage: () => storage,
  }
 

}));
 */