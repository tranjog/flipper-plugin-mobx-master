import React, { useState } from "react";
import { Button, Input, Row, Col, Typography } from "antd";
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

  const stringifyPayload = () => {
    let newPayload: any = payload;

    try {
      if (
        payload.charAt(0) === "{" &&
        payload.charAt(payload.length - 1) === "}"
      ) {
        newPayload = payload.substring(1, payload.length - 1);
      }

      newPayload = newPayload
        .replaceAll("'", "")
        .replaceAll(`"`, "")
        .split(",")
        .map((x) =>
          x.split(":").map((y, i) => {
            if (i === 0) {
              return y.trim();
            }
            if (i === 1) {
              if (y === "true" || y === true) return true;
              if (y === "false" || y === false) return false;
              if (!Number.isNaN(Number(y))) return Number(y);
              return y.trim();
            }
          })
        )
        .reduce((a, x) => {
          a[x[0]] = x[1];
          return a;
        }, {});
      newPayload = JSON.stringify(newPayload);
    } catch (e) {}

    setPayload(newPayload);
  };
  return (
    <Layout.Container>
      <Panel title="Payload" collapsible={false}>
        <Row style={{ margin: 16 }}>
          <Col span={19}>
            <Input.TextArea
              onChange={inputHandler}
              value={payload}
              style={{ height: 72 }}
            />
          </Col>
          <Col span={4} offset={1}>
            <Button disabled={!payload} onClick={stringifyPayload}>
              Stringify
            </Button>
            <Typography.Text style={{ fontSize: 11, marginTop: 4 }}>
              Transform to a parsable object
            </Typography.Text>
          </Col>
        </Row>

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
