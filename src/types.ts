export type Events = {
  action: Row;
  init: Settings;
};

type EmitAction = { storeKey: string; action: string; payload: any };

export type Requests = {
  message: (str: string) => Promise<any>;
  emitAction: (emit: EmitAction) => Promise<any>;
};

export type Row = {
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
};

export type Store = Record<string, { actions: string[] }>;

export type Settings = {
  storeList: { id: string; title: string; actions: string[] }[];
  stores: Store[];
};

export enum TabLabel {
  state = "StateTree",
  diff = "Diff",
}
