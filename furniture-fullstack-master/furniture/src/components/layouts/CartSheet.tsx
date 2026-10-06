import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
// import { cartItems } from "@/data/carts";
import { Icons } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartItem from "@/components/carts/CartItem";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

export default function CartSheet() {
  // const itemCount = 4;
  // const amountTotal = 190;
  const itemCount = useCartStore((state) => state.getTotalItems());
  const amountTotal = useCartStore((state) => state.getTotalPrice());
  const { carts } = useCartStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          aria-label="Open cart"
        >
          {itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 size-6 justify-center rounded-full p-2.5"
            >
              {itemCount}
            </Badge>
          )}
          <Icons.cart className="size-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col gap-4 md:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            {itemCount > 0 ? `Cart - ${itemCount}` : "Empty Cart"}
          </SheetTitle>
        </SheetHeader>
        <Separator />
        {carts.length > 0 ? (
          <div className="flex flex-col">
            <ScrollArea className="max-h-[50vh] pb-4">
              <div className="flex flex-1 flex-col gap-4 pr-4">
                {carts.map((cart) => (
                  <CartItem cart={cart} key={cart.id} />
                ))}
              </div>
            </ScrollArea>
            <div className="space-y-4 rounded-lg border border-muted/50 bg-muted/20 px-4 py-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between gap-6">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <span>Total</span>
                  <span>{formatPrice(amountTotal.toFixed(2))}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" asChild className="w-full">
                    <Link to="/checkout" aria-label="Check out">
                      Continue to checkout
                    </Link>
                  </Button>
                </SheetClose>
              </SheetFooter>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-1">
            <Icons.cart className="mb-4 text-muted-foreground size-16" />
            <div className="text-xl font-medium text-muted-foreground">
              Your cart is empty
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
