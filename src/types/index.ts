import type {
  TRPCClientOutgoingMessage,
  TRPCErrorResponse,
  TRPCRequest,
  TRPCResultMessage,
} from '@trpc/server/rpc';

export type TRPCChromeRequest = {
  trpc: TRPCRequest | TRPCClientOutgoingMessage;
};

export type TRPCChromeSuccessResponse = {
  trpc: TRPCResultMessage<any>;
};

export type TRPCChromeErrorResponse = {
  trpc: TRPCErrorResponse;
};

export type TRPCChromeResponse = TRPCChromeSuccessResponse | TRPCChromeErrorResponse;

export type TRPCChromeMessage = TRPCChromeRequest | TRPCChromeResponse;
export type RelayedTRPCMessage = TRPCChromeMessage & { relayed?: true };

export type MinimalWindow = Pick<
  Window,
  'postMessage' | 'addEventListener' | 'removeEventListener'
>;

export type MinimalPopupWindow = Pick<Window, 'postMessage' | 'closed'> &
  // addEventListener/removeEventListener are only available on the same origin
  Partial<Pick<Window, 'addEventListener' | 'removeEventListener'>>;

export interface MessengerMethods {
  postMessage: (message: TRPCChromeMessage) => void;
  addMessageListener: (listener: (message: TRPCChromeMessage) => void) => void;
  removeMessageListener: (listener: (message: TRPCChromeMessage) => void) => void;
  addCloseListener: (listener: () => void) => void;
  removeCloseListener: (listener: () => void) => void;
}
