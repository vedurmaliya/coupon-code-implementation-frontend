import { Button, Input, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
function Cart() {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("0");
  const [price, setPrice] = useState("26.99");
  const [apply, setApply] = useState(false);
  const location = useLocation();

  const checkout = async (id) => {
    setDiscount(0);
    console.log(id, "id");
    try {
      const response = await axios.post("http://localhost:5000/api/checkout", {
        data: {
          couponCode: code,
          totalPrice: price,
        },
      });

      setDiscount(price - response.data.finalPrice);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    console.log(location);

    checkout();
  }, [apply, code]);
  useEffect(() => {
    if (location.state && location.state.coupon) {
      setCode(location.state.coupon.code);
    }
  }, []);

  return (
    <div className="flex flex-col  font-semibold  w-full text-3xl">
      <div className="w-full text-center">Your Cart </div>
      <div className="grid grid-cols-10  gap-3 py-10 text-sm px-4  ">
        <div className="flex flex-col   col-span-7 col-start-1">
          <div className="flex flex-row justify-between px-3 py-3  border-y">
            <div>Johan & Nystrom Caravan</div>
            <div>${price}</div>
          </div>
        </div>
        <div className="col-span-3  flex flex-col gap-3 ">
          <div className="flex flex-col border p-4 gap-8 ">
            <div className="flex flex-row justify-between">
              <div>Subtotal</div>
              <div>${price}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div>Shipping</div>
              <div>Free</div>
            </div>
            <div className="flex flex-col gap-3">
              <div>Coupon Codes:</div>
              <div className="flex flex-row gap-0 items-center justify-center w-full ">
                <div class="w-full">
                  <input
                    type="text"
                    id="outlined-basic"
                    label="Coupon"
                    variant="outlined"
                    size="small"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div
                  className="  h-full flex items-center border border-l-0 border-gray-300 w-10 justify-center"
                  onClick={() => {
                    setApply((prev) => !prev);
                  }}
                >
                  <ArrowRightAltIcon></ArrowRightAltIcon>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between">
              <div>Discount</div>
              <div>${discount || 0}</div>
            </div>

            <div className="flex flex-row justify-between">
              <div>Total</div>
              <div>${price - discount}</div>
            </div>
          </div>
          <Button variant="contained">checkout</Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
