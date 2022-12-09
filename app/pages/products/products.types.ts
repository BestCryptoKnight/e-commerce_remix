export interface ServiceFieldsProps {
  attendanceType: string;
  selectedLocation: { location: string; field: string };
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<{ location: string; field: string }>
  >;
}

export interface ProductDetailsFieldsTypes {
  selectedProduct: any;
}
