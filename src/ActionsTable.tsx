import React from "react";
import { Typography, Button } from "antd";
import { DataSource, DataTable, DataTableColumn, Layout } from "flipper-plugin";

import { Row } from "./types";

const columns: DataTableColumn<Row>[] = [
  {
    key: "time",
    title: "Time",
    width: "20%",
  },
  {
    key: "storeName",
    title: "Store",
    width: "20%",
  },
  {
    key: "actionName",
    title: "Action",
    width: "40%",
    onRender: ({ action: { type } }) => (
      <Typography.Text>{type}</Typography.Text>
    ),
  },
  {
    key: "took",
    title: "Took",
    width: "20%",
  },
];

interface IActionsTable {
  data: DataSource<Row, string>;
  onSelect: (row: Row | undefined) => void;
  clear: () => void;
}

export const ActionsTable: React.FC<IActionsTable> = ({
  data,
  onSelect,
  clear,
}) => {
  return (
    <Layout.Container grow={true}>
      <DataTable
        dataSource={data}
        columns={columns}
        onSelect={onSelect}
        extraActions={<Button onClick={clear}>clear</Button>}
      />
    </Layout.Container>
  );
};
