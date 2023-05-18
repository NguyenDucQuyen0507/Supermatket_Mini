import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const persistOptions = {
  name: "cart-storage", // unique name
  getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
};
export const useCart = create(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        add: ({ product, quantity }) => {
          const item = get().items;
          console.log(item);
          const found = item.find((x) => x.product._id === product._id);
          if (found) {
            found.quantity++;
          } else {
            item.push({ product, quantity });
          }
          return set({ items: item }, false, { type: "addToCart" });
        },
        remove: (id) => {
          const item = get().items;
          const found = item.find((x) => x.product._id === id);
          if (found) {
            const remove = item.filter((x) => x.product._id !== id);
            return set({ items: remove }, false, { type: "removeProduct" });
          }
        },
        plus: (id) => {
          const item = get().items;
          const found = item.find((x) => x.product._id === id);
          //lấy hàng tồn kho
          const stock = found.product.stock;
          if (found) {
            if (found.quantity < stock) {
              found.quantity++;
            } else {
              toast.error("Số lượng sản phẩm không được đủ");
            }
            return set({ items: item }, false, { type: "plusProduct" });
          }
        },
        subtract: (id) => {
          const item = get().items;
          const found = item.find((x) => x.product._id === id);
          if (found.quantity === 1) {
            const remove = item.filter((x) => x.product._id !== id);
            return set({ items: remove }, false, { type: "subtractProduct" });
          } else {
            found.quantity--;
            return set({ items: item }, false, { type: "subtractProduct" });
          }
        },
      }),
      persistOptions
    )
  )
);
