import React, { useState } from "react";
import {
  PluginClient,
  usePlugin,
  createState,
  createDataSource,
  useValue,
  Layout,
  uuid,
} from "flipper-plugin";

import { Sidebar } from "./Sidebar";
import { StoreSelector } from "./StoreSelector";
import { ActionEmitter } from "./ActionEmitter";
import { ActionSelector } from "./ActionSelector";
import { ActionsTable } from "./ActionsTable";
import type { Events, Requests, Row, Settings } from "./types";

export function plugin(client: PluginClient<Events, Requests>) {
  const allData = createDataSource<Row, "id">([], { key: "id" });

  const settings = createState<Pick<Settings, "storeList">>({
    storeList: [{ title: "All Stores", id: "0", actions: [] }],
  });

  client.onMessage("init", (newSettings: Settings) => {
    settings.update((draft) => {
      const storeEntries = Object.entries(
        newSettings.stores as Settings["stores"]
      );

      draft.storeList = [{ title: "All Stores", id: "0", actions: [] }].concat(
        storeEntries.map(
          (store) =>
            ({
              id: store[0],
              title: store[0],
              actions: (store[1].actions as unknown as never[]) ?? [],
            } ?? [])
        )
      );
    });
    allData.view.setSortBy("startTime");
  });

  client.onMessage("action", (newData) => {
    const dataRow = { ...newData, id: uuid() };
    allData.upsert(dataRow);
  });

  const onStoreSelected = (newStore: string) => {
    if (newStore === "0") {
      allData.view.reset();
      allData.view.setSortBy("startTime");
      return;
    }
    allData.view.setFilter(({ storeName }) => storeName === newStore);
  };

  const clear = () => {
    allData.view.reset();
    allData.view.setSortBy("startTime");
    allData.clear();
  };

  const logger = (str: string) => {
    client.send("message", str);
  };

  const emitAction = (store: string, action: string, payload: any) => {
    client.send("emitAction", {
      storeKey: store,
      action,
      payload,
    });
  };

  return { allData, settings, onStoreSelected, logger, clear, emitAction };
}

export function Component() {
  const { allData, settings, onStoreSelected, logger, clear, emitAction } =
    usePlugin(plugin);
  const { storeList } = useValue(settings);
  const [selectedID, setSelectedID] = useState("");
  const [selectedStore, setSelectedStore] = useState("0");
  const [selectedStoreActions, setSelectedStoreActions] = useState<string[]>(
    []
  );

  const [selectedAction, setSelectedAction] = useState("");

  const handleStoreSelect = (newStore: string) => {
    setSelectedStore(newStore);
    storeList.forEach((store) => {
      if (store.id === newStore) {
        setSelectedStoreActions(store.actions);
      }
    });
    setSelectedAction("");
    onStoreSelected(newStore);
  };

  const handleActionSelect = (newAction: string) => {
    setSelectedAction(newAction);
  };

  const onRowHighlighted = (row: Row | undefined) => {
    setSelectedID(row?.id ?? "");
  };

  const onEmitAction = (payload: any) => {
    logger(
      `Emit action: ${selectedStore}.${selectedAction} with payload ${payload}`
    );
    emitAction(selectedStore, selectedAction, payload);
  };

  return (
    <Layout.Container grow={true}>
      <StoreSelector
        storeSelectionList={storeList}
        selectedStore={selectedStore}
        onStoreSelect={handleStoreSelect}
      />
      <ActionSelector
        acionList={selectedStoreActions}
        selectedAction={selectedAction}
        onActionSelect={handleActionSelect}
      />
      <ActionEmitter onEmitAction={onEmitAction} />
      <ActionsTable data={allData} onSelect={onRowHighlighted} clear={clear} />
      <Sidebar actions={allData} selectedID={selectedID} />
    </Layout.Container>
  );
}
