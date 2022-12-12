import { Tabs } from "antd";
import { SettingsWrapper } from "./styles";
import { settingsStatusTabs } from "./Settings.utils";

const tabItems = settingsStatusTabs.map((item, i) => {
  const id = String(i + 1);
  return {
    label: item?.label,
    key: id,
    children: item.children,
  };
});
const index = () => {
  return (
    <SettingsWrapper className="flex w-full justify-start">
      <Tabs items={tabItems} />
    </SettingsWrapper>
  );
};

export default index;
