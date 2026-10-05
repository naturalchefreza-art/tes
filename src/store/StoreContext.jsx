import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";

const StoreContext = createContext(null);

const CART_KEY = "armania.cart";
const WISH_KEY = "armania.wishlist";
const CUR_KEY = "armania.currency";
const USER_KEY = "armania.user";

const CURRENCIES = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "€", rate: 0.92 },
  GBP: { symbol: "£", rate: 0.79 },
};

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const { id, qty } = action;
      const existing = state.find((l) => l.id === id);
      if (existing) {
        return state.map((l) =>
          l.id === id ? { ...l, qty: Math.min(l.qty + qty, 99) } : l
        );
      }
      return [...state, { id, qty }];
    }
    case "setQty":
      return state.map((l) =>
        l.id === action.id ? { ...l, qty: Math.max(1, Math.min(action.qty, 99)) } : l
      );
    case "remove":
      return state.filter((l) => l.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, null, () =>
    loadJSON(CART_KEY, [])
  );
  const [wishlist, setWishlist] = useState(() => loadJSON(WISH_KEY, []));
  const [currency, setCurrency] = useState(
    () => loadJSON(CUR_KEY, "USD")
  );
  const [user, setUser] = useState(() => loadJSON(USER_KEY, null));
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    localStorage.setItem(CUR_KEY, JSON.stringify(currency));
  }, [currency]);
  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  const value = useMemo(() => {
    const format = (usd) => {
      const { symbol, rate } = CURRENCIES[currency] || CURRENCIES.USD;
      const v = usd * rate;
      return `${symbol}${v.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    };
    return {
      cart,
      dispatch,
      cartCount: cart.reduce((n, l) => n + l.qty, 0),
      wishlist,
      inWishlist: (id) => wishlist.includes(id),
      toggleWishlist: (id) =>
        setWishlist((w) =>
          w.includes(id) ? w.filter((x) => x !== id) : [...w, id]
        ),
      currency,
      currencies: Object.keys(CURRENCIES),
      setCurrency,
      format,
      user,
      signIn: (u) => {
        setUser(u);
        setAuthOpen(false);
      },
      signOut: () => setUser(null),
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      authOpen,
      setAuthOpen,
      mobileNavOpen,
      setMobileNavOpen,
      addToCart: (id, qty = 1) => {
        dispatch({ type: "add", id, qty });
        setCartOpen(true);
      },
    };
  }, [cart, wishlist, currency, user, cartOpen, searchOpen, authOpen, mobileNavOpen]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
