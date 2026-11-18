import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Bag } from "./data/bags";

const CART_KEY = "bagstore_cart";

interface CartLine {
  bagId: number;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  quantityOf: (bagId: number) => number;
  add: (bagId: number) => void;
  remove: (bagId: number) => void;
  setQuantity: (bagId: number, quantity: number) => void;
  clear: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines]);

  function quantityOf(bagId: number): number {
    return lines.find((line) => line.bagId === bagId)?.quantity ?? 0;
  }

  function add(bagId: number) {
    setLines((prev) => {
      const existing = prev.find((line) => line.bagId === bagId);
      if (existing) {
        return prev.map((line) =>
          line.bagId === bagId ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [...prev, { bagId, quantity: 1 }];
    });
  }

  function remove(bagId: number) {
    setLines((prev) => prev.filter((line) => line.bagId !== bagId));
  }

  function setQuantity(bagId: number, quantity: number) {
    if (quantity <= 0) {
      remove(bagId);
      return;
    }
    setLines((prev) =>
      prev.some((line) => line.bagId === bagId)
        ? prev.map((line) => (line.bagId === bagId ? { ...line, quantity } : line))
        : [...prev, { bagId, quantity }],
    );
  }

  function clear() {
    setLines([]);
  }

  const totalItems = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);

  return (
    <CartContext.Provider value={{ lines, quantityOf, add, remove, setQuantity, clear, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export function cartLinesWithBags(lines: CartLine[], bags: Bag[]) {
  return lines
    .map((line) => ({ line, bag: bags.find((b) => b.id === line.bagId) }))
    .filter((entry): entry is { line: CartLine; bag: Bag } => entry.bag !== undefined);
}
