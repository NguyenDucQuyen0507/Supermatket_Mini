import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
const persistOptions = {
  name: "user-storage", // unique name
  getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
};
export const useUser = create(
  devtools(
    persist(
      (set, get) => ({
        users: {},
        add: (customer) => {
          const item = get().users;
          //   console.log(item);
          //   const itemCustomer = Object.assign({}, item, customer);
          Object.assign(item, customer);
          //dùn để gán giá tất cả giá trị vào item
          return set({ users: item }, false, { type: "addUser" });
        },
      }),
      persistOptions
    )
  )
);
