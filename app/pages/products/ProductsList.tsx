import { useEffect } from "react";
import { GetProductsAction } from "../../redux/app/actions/product";
import { useAppDispatch } from "../../hooks/Store";
export default function Index() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      GetProductsAction("63900f62788c2b789fe57cb4", "63900eb5788c2b789fe57cb3")
    );
  }, [dispatch]);
  return <main className="sm:items-center sm:justify-center">Content</main>;
}
