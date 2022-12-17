import Profile from "./profile";
import BusinessInfo from "./business-info";
import StoreSetting from "./store-settings";
import UserProfileIcon from "~/assets/icons/UserProfileIcon";
import BusinessInfoIcon from "~/assets/icons/BusinessInfoIcon";
import StoreSettingsIcon from "~/assets/icons/StoreSettingsIcon";

export const settingsStatusTabs = [
  {
    label: (
      <div className="flex items-center justify-center">
        <UserProfileIcon />
        <p className="mx-2 -mb-1">User Profile</p>
      </div>
    ),
    children: <Profile />,
  },
  {
    label: (
      <div className="flex items-center justify-center">
        <BusinessInfoIcon />

        <p className="mx-2 -mb-1">Business Info</p>
      </div>
    ),
    children: <BusinessInfo />,
  },
  {
    label: (
      <div className="flex items-center justify-center">
        <StoreSettingsIcon />
        <p className="mx-2 -mb-1">Store Settings</p>
      </div>
    ),
    children: <StoreSetting />,
  },
];
