import Profile from "./profile";
import BusinessInfo from "./business-info";
import StoreSetting from "./store-settings";
export const settingsStatusTabs = [
  {
    label: "User profile",
    children: <Profile />,
  },
  {
    label: "Business Info",
    children: <BusinessInfo />,
  },
  {
    label: "Store Settings",
    children: <StoreSetting />,
  },
];
