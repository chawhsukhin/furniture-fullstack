import { formatPrice, resolveImageUrl } from "@/lib/utils";
import type { Cart } from "@/types";
import { Separator } from "@/components/ui/separator";
import Editable from "./Editable";
import { useCartStore } from "@/store/cartStore";

interface CartProps {
  cart: Cart;
}

const fallbackImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23f1f5f9'/%3E%3Cpath d='M16 44l10-12 8 10 6-8 10 10' stroke='%2394a3b8' stroke-width='3' fill='none'/%3E%3Ccircle cx='24' cy='24' r='4' fill='%2394a3b8'/%3E%3C/svg%3E";

function CartItem({ cart }: CartProps) {
  const { updateItem, removeItem } = useCartStore();
  const imageSrc = resolveImageUrl(cart.image) || fallbackImage;

  const updateHandler = (quantity: number) => {
    updateItem(cart.id, quantity);
  };

  const deleteHandler = () => {
    removeItem(cart.id);
  };

  return (
    <div className="space-y-3 rounded-lg border border-muted/40 bg-muted/20 p-3">
      <div className="flex gap-4">
        <img
          src={imageSrc}
          alt={cart.name}
          loading="lazy"
          decoding="async"
          className="h-16 w-16 rounded-md object-cover"
          onError={(event) => {
            event.currentTarget.src = fallbackImage;
          }}
        />
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-medium line-clamp-1">{cart.name}</span>
          <span className="text-xs text-muted-foreground">
            {formatPrice(cart.price)} x {cart.quantity} ={" "}
            {formatPrice((cart.price * cart.quantity).toFixed(2))}
          </span>
        </div>
      </div>
      <Editable
        onDelete={deleteHandler}
        quantity={cart.quantity}
        onUpdate={updateHandler}
      />
      <Separator className="bg-muted/60" />
    </div>
  );
}

export default CartItem;
