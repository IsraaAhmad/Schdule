import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import { DatePicker, Space } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";

ReactDOM.render(
  <Space direction="vertical" size={12}>
    <RangePicker
      defaultValue={[
        moment("2015/01/01", dateFormat),
        moment("2015/01/01", dateFormat)
      ]}
      format={dateFormat}
    />
  </Space>,
  document.getElementById("container")
);
