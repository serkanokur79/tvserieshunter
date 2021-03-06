import React from "react";

import { Tabs } from "antd";

const { TabPane } = Tabs;

function TapBar(props) {
  const { labels, contents } = props;

  function callback(key) {
    console.log(key);
  }
  return (
    <Tabs onChange={callback} type='card'>
      {contents.map((content, i) => (
        <TabPane tab={labels[i]} key={i}>
          {content}
        </TabPane>
      ))}
    </Tabs>
  );
}

export default TapBar;
