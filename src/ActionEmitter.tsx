import React, { useState } from "react";
import { Button, Input } from "antd";
import { Layout, Panel } from "flipper-plugin";

interface IActionEmitter {
  onEmitAction: (payload: any) => void;
  selectedAction: string;
}

export const ActionEmitter: React.FC<IActionEmitter> = ({
  onEmitAction,
  selectedAction,
}) => {
  const [payload, setPayload] = useState("");
  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setPayload(e.target.value);
  };
  return (
    <Layout.Container>
      <Panel title="Payload" collapsible={false}>
        <Input.TextArea
          onChange={inputHandler}
          style={{ margin: 8, width: "calc(100% - 16px)", height: 54 }}
        />
        <Button
          disabled={!selectedAction}
          style={{ margin: 8 }}
          onClick={() => onEmitAction(payload)}
        >
          Emit action
        </Button>
      </Panel>
    </Layout.Container>
  );
};
