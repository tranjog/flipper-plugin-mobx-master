import React from "react";
import { Select } from "antd";
import { Layout, Panel } from "flipper-plugin";

interface IActionSelector {
  onActionSelect: (newSelection: string) => void;
  acionList: string[];
  selectedAction: string;
}

export const ActionSelector: React.FC<IActionSelector> = ({
  onActionSelect,
  acionList,
  selectedAction,
}) => {
  return (
    <Layout.Container>
      <Panel title="Actions" pad="small" collapsible={false}>
        <Select
          value={selectedAction}
          showSearch
          placeholder="Select an action"
          onChange={onActionSelect}
          onSearch={onActionSelect}
        >
          {acionList?.map((action, i) => (
            <Select.Option value={action}>{action}</Select.Option>
          ))}
        </Select>
      </Panel>
    </Layout.Container>
  );
};
