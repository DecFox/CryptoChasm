// type aliases
type Action = 'Set_Wallet_Address'; // literal type alias

// interface declarations
export interface UserInterface {
  walletAddress: string;
}

export interface ActionInterface {
  type: Action;
  user: UserInterface;
}

export const UserReducer = (state: UserInterface, action: ActionInterface) => {
  switch (action.type) {
    case 'Set_Wallet_Address':
      return { ...state, walletAddress: action.user.walletAddress };
    default:
      return state;
  }
};
