import React, { useEffect } from "react";
import { useReduxDispatch, useReduxSelector } from "src/app/hook";
import {
  fetchOrders,
  clearErrors,
  selectFetchOrdersError,
  selectOrders,
} from "src/slices/orderSlice";
import { logout } from "src/slices/authSlice";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Container from "src/components/Container";
import Order from "./Order";

const ProfileView = () => {
  const dispatch = useReduxDispatch();
  const history = useHistory();
  const orders = useReduxSelector(selectOrders);
  const fetchOrdersError = useReduxSelector(selectFetchOrdersError);

  const handleLogoutClick = () => {
    dispatch(logout());
    history.push("/");
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (fetchOrdersError) {
      toast(fetchOrdersError, { type: "error", position: "bottom-center" });
      dispatch(clearErrors());
    }
  }, [fetchOrdersError, dispatch]);

  return (
    <Container maxWidth="lg">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">My Last Orders</h1>
          <button
            onClick={handleLogoutClick}
            className="bg-red-500 text-white px-3 py-1 rounded-md transition duration-200 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <div className="border border-gray-300 w-full mt-2"></div>
        <div className="flex flex-col mt-8">
          {orders.map((order, i) => (
            <Order order={order} key={i} />
          ))}
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default ProfileView;
