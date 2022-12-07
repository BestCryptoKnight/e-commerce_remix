import { useEffect } from "react";
import { GetProductsAction } from "Redux/App/Actions/Product";
import { useAppDispatch } from "Hooks/Store";
const ProductsList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      GetProductsAction("63900f62788c2b789fe57cb4", "63900eb5788c2b789fe57cb3")
    );
  }, [dispatch]);

  return <div>ProductsList</div>;
};

export default ProductsList;
