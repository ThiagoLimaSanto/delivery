import type { MenuType } from '../../types/Product';

type Action =
  | { type: 'ADD_ITEM'; payload: MenuType }
  | { type: 'INCREASE'; payload: string }
  | { type: 'DECREASE'; payload: string }
  | { type: 'REMOVE'; payload: string }
  | { type: 'CLEAR' };

export function orderReducer(state: MenuType[], action: Action): MenuType[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const itemExists = state.find(
        i => i.productId === action.payload.productId,
      );

      if (itemExists) {
        return state.map(i =>
          i.productId === action.payload.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }

      return [...state, action.payload];
    }

    case 'INCREASE':
      return state.map(item =>
        item.productId === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

    case 'DECREASE':
      return state.map(item =>
        item.productId === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );

    case 'REMOVE':
      return state.filter(item => item.productId !== action.payload);

    case 'CLEAR':
      return [];

    default:
      return state;
  }
}
