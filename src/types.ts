export interface Events {
  action: Row;
  init: Settings;
}

export interface EmitAction {
  storeKey: string;
  action: string;
  payload: any;
}

export interface Requests {
  message: (str: string) => Promise<any>;
  emitAction: (emit: EmitAction) => Promise<any>;
}

export interface Row {
  id: string;
  actionName: string;
  action: {
    type: string;
    payload: any;
  };
  took: string;
  startTime: string;
  time: string;
  before: object;
  after: object;
  storeName: string;
  isAsyncStoragePresent?: boolean;
}

export interface Settings {
  storeList: { id: string; title: string; actions: string[] }[];
  stores: Store[];
}

export type Store = Record<string, { actions: string[] }>;

export enum TabLabel {
  state = "StateTree",
  diff = "Diff",
}
