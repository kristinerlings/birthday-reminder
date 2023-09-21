/*setItem() 
is used both to add new data item (when no data for given key exists), 
and to modify existing item (when previous data for given key exists).*/

import { create } from 'zustand';

interface BirthdayData {
  name: string;
  message: string;
  date: Date | null;
}

type BirthdayStore = {
  data: BirthdayData[];
  setData: (data: BirthdayData[]) => void;
};

//responsible for managing the birthday data
export const useBirthdayStore = create<BirthdayStore>((set) => ({
  data: [], // Initialize the array as empty
  setData: (data) => set({ data }),

  //Add single birthday to my data array in the store, can now use the addBirthday function to add it to the store (add)
 /*  addBirthday: (birthday: BirthdayData) => {
    set((state) => ({
      data: [...state.data, birthday],
    }))
  } */
}));
