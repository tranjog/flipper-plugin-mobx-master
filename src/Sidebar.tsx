import React, { useState } from "react";
import {
  DataInspector,
  DetailSidebar,
  Panel,
  Tabs,
  Tab,
  DataSource,
} from "flipper-plugin";

import { Row, TabLabel } from "./types";

interface ISidebar {
  selectedID: string;
  actions: DataSource<Row, string>;
}

export const Sidebar: React.FC<ISidebar> = ({ selectedID, actions }) => {
  const [activeTab, setActiveTab] = useState<string>(TabLabel.state);
  const data = actions.getById(selectedID);

  let acts = "";

  try {
    acts = JSON.stringify(data);
  } catch (e) {}

  let after: any = {};
  let before: any = {};
  let action: any = { payload: undefined, type: undefined };

  if (data) {
    ({ after, before, action } = data);
  }

  return (
    <DetailSidebar>
      <Panel title="Action" pad="tiny">
        <DataInspector data={action} collapsed={true} expandRoot={true} />
      </Panel>
      <Panel title="State" pad="tiny">
        <Tabs
          defaultActiveKey={activeTab}
          onChange={setActiveTab}
          activeKey={activeTab}
        >
          <Tab tab={TabLabel.state}>
            <DataInspector data={after} collapsed={true} expandRoot={true} />
          </Tab>
          <Tab tab={TabLabel.diff}>
            <DataInspector
              diff={before}
              data={after}
              collapsed={true}
              expandRoot={true}
            />
          </Tab>
        </Tabs>
      </Panel>
    </DetailSidebar>
  );
};
