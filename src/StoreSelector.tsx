import React from "react";
import { Select } from "antd";
import { Layout, Panel } from "flipper-plugin";

interface IStoreSelector {
  onStoreSelect: (newSelection: string) => void;
  storeSelectionList: { title: string; id: string }[];
  selectedStore: string;
}

export const StoreSelector: React.FC<IStoreSelector> = ({
  onStoreSelect,
  storeSelectionList,
  selectedStore,
}) => {
  return (
    <Layout.Container>
      <Panel title="Stores" pad="small" collapsible={false}>
        <Select
          value={selectedStore}
          showSearch
          placeholder="Select a store"
          optionFilterProp="children"
          onChange={onStoreSelect}
          onSearch={onStoreSelect}
          filterOption={(input, option) =>
            (option?.children as unknown as string)
              ?.toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
        >
          {storeSelectionList?.map(({ id, title }) => (
            <Select.Option value={id}>{title}</Select.Option>
          ))}
        </Select>
      </Panel>
    </Layout.Container>
  );
};
