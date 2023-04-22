import { Button, Input, List, Typography } from "antd";
import { useCostStore } from "../data/store";

import { Col, Row } from "antd";
import { useRef } from "react";

const { TextArea } = Input;

const placeholder = `Расходы
<список расходов>
<хлеб 120>

Доходы
<список расходов>
<Дивиденды 50к>`;

export default function Categories() {
  const inputRef = useRef(null);
  const { fetch, costs } = useCostStore() as any;
  const sendData = () => {
    const text = inputRef.current.resizableTextArea.textArea.value;
    fetch(text);
  };
  return (
    <>
      <Col span={24}>
        <Row justify={"center"} gutter={[16, 24]}>
          <Typography.Title level={2}>Типа учет расходов</Typography.Title>
          <Col span={16}>
            <TextArea placeholder={placeholder} ref={inputRef} rows={4} />
          </Col>
          <Col span={16}>
            <Row justify={"end"}>
              <Button type="primary" onClick={sendData}>
                Добавить
              </Button>
            </Row>
          </Col>
        </Row>
        <Row justify={"center"} gutter={[16, 24]}>
          <Col span={16}>
            {Boolean(costs.length) && (
              <List
                bordered
                dataSource={costs}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark={item.type === "doxod"}>
                      {item.type === "doxod" ? "Доход" : "Расход"} на{" "}
                      {item.tags[0]}
                    </Typography.Text>{" "}
                    {item.amount}
                  </List.Item>
                )}
              />
            )}
          </Col>
        </Row>
      </Col>
    </>
  );
}
