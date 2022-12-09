export interface DrawerPropsTypes {
  title: string;
  size?: "default" | "large";
  onClose: () => void;
  open: boolean;
  placement?: Placement;
  extra?: JSX.Element;
  children: JSX.Element;
}
export type Placement = "left" | "right" | "top" | "bottom";
