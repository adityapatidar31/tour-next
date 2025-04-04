import { useAppSelector } from "@/services/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const user = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.name) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user.name) return null;

  const cardItem = user.cart;

  return <div>Cart Component</div>;
}
