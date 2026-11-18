import { BAGS } from "../data/bags";
import { cartLinesWithBags, useCart } from "../cart";

export default function CartDrawer({ onClose }: { onClose: () => void }) {
  const { lines, setQuantity, remove, clear } = useCart();
  const entries = cartLinesWithBags(lines, BAGS);
  const total = entries.reduce((sum, { line, bag }) => sum + line.quantity * bag.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30" data-testid="cart-drawer">
      <div className="flex h-full w-full max-w-sm flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-neutral-900">Your Cart</h2>
          <button
            type="button"
            data-testid="cart-close"
            onClick={onClose}
            className="text-sm text-neutral-500 hover:text-neutral-900"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {entries.length === 0 && (
            <p data-testid="cart-empty" className="text-sm text-neutral-500">
              Your cart is empty.
            </p>
          )}

          {entries.map(({ line, bag }) => (
            <div
              key={bag.id}
              data-testid={`cart-line-${bag.id}`}
              className="mb-4 flex items-center gap-3 border-b border-neutral-100 pb-4"
            >
              <img src={bag.imageUrl} alt={bag.name} className="h-16 w-16 rounded-md object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-900">{bag.name}</p>
                <p className="text-xs text-neutral-500">
                  {bag.gender} · {bag.color.name} · ${bag.price}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <button
                    type="button"
                    data-testid={`cart-decrement-${bag.id}`}
                    onClick={() => setQuantity(bag.id, line.quantity - 1)}
                    className="flex h-6 w-6 items-center justify-center rounded border border-neutral-300 text-sm hover:bg-neutral-100"
                  >
                    −
                  </button>
                  <span data-testid={`cart-quantity-${bag.id}`} className="w-5 text-center text-sm">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    data-testid={`cart-increment-${bag.id}`}
                    onClick={() => setQuantity(bag.id, line.quantity + 1)}
                    className="flex h-6 w-6 items-center justify-center rounded border border-neutral-300 text-sm hover:bg-neutral-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                type="button"
                data-testid={`cart-remove-${bag.id}`}
                onClick={() => remove(bag.id)}
                className="text-xs text-neutral-400 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-200 px-5 py-4">
          <div className="mb-3 flex items-center justify-between text-sm font-semibold text-neutral-900">
            <span>Total</span>
            <span data-testid="cart-total">${total}</span>
          </div>
          <button
            type="button"
            data-testid="cart-clear"
            onClick={clear}
            disabled={entries.length === 0}
            className="w-full rounded-md border border-neutral-300 py-2 text-sm text-neutral-700 hover:bg-neutral-100 disabled:opacity-40"
          >
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}
