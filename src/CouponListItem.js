import React, { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function CouponListItem({ coupon, setReload }) {
  const navigate = useNavigate();
  const [copiedText, setCopiedText] = useState("");
  const [id, setId] = useState("");
  function handleCopy() {
    setCopiedText(coupon.code);
    setId(coupon._id);
    navigator.clipboard.writeText(coupon.code);
  }

  const deleteId = async (id) => {
    console.log(id, "id");
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/coupons/delete",
        { data: { id: id } }
      );
    } catch (error) {
      console.error(error);
    }
    setReload((prev) => !prev);
  };

  useEffect(() => {
    console.log(coupon, "coupon");
  }, [coupon]);

  return (
    coupon.active && (
      <div className="flex flex-col justify-between w-[400px] rounded-lg border-gray-800 border-2 m-4 shrink-0 p-2">
        <div className=" text-2xl font-bold flex flex-row justify-between">
          {coupon.discountAmount}% OFF{" "}
          <div
            onClick={() => {
              deleteId(coupon._id);
            }}
          >
            <DeleteIcon></DeleteIcon>
          </div>
        </div>
        <div className="color-blue">
          Coupon Code: <span>{coupon.code}</span>
        </div>
        <div>
          Expiry date: {moment(coupon.expirationDate).format("MM/DD/YYYY")}
        </div>
        <div className="flex flex-row justify-end" onClick={() => handleCopy()}>
          <div
            className={`${
              copiedText === coupon.code && coupon._id === id
                ? " bg-red-500 "
                : " bg-none  "
            }`}
          >
            <ContentCopyIcon />
          </div>
        </div>
        <div
          className="border p-1 w-min flex flex-row rounded-md hover:border-red-500"
          onClick={() => {
            navigate("/cart", {
              state: { coupon: coupon },
            });
          }}
        >
          <ArrowRightAltIcon></ArrowRightAltIcon>
          Apply
        </div>
        {/* Add update and delete buttons */}
      </div>
    )
  );
}

export default CouponListItem;
