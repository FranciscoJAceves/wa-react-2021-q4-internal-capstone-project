import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

const CartContext = createContext();

function cartReducer(state, action) {
  const payload = action.payload;
  const itemIndex = state.findIndex(({ item }) => item?.id === payload.item.id);

  switch (action.type) {
    case "add":
      if (itemIndex < 0) {
        return [...state, payload];
      } else {
        return state.map(({ item, quantity }) =>
          item.id === payload.item.id
            ? { item, quantity: quantity + payload.quantity }
            : { item, quantity }
        );
      }
    case "remove":
      if (itemIndex < 0) {
        return state;
      } else if (state[itemIndex].quantity - payload.quantity > 0) {
        return state.map(({ item, quantity }) =>
          item.id === payload.item.id
            ? { item, quantity: quantity - payload.quantity }
            : { item, quantity }
        );
      } else {
        return [...state.slice(0, itemIndex), ...state.slice(itemIndex + 1)];
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const value = useMemo(() => ({ cart, dispatch }), [cart]);
  return <CartContext.Provider value={value} {...props} />;
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  const { cart, dispatch } = context;
  const addItem = useCallback(
    (item, quantity) => {
      dispatch({ type: "add", payload: { item, quantity } });
    },
    [dispatch]
  );
  const removeItem = useCallback(
    (item, quantity) => {
      dispatch({ type: "remove", payload: { item, quantity } });
    },
    [dispatch]
  );
  return { cart, addItem, removeItem };
}

export { CartProvider, useCart };