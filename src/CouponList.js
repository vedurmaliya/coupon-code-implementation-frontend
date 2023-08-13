import React, { useEffect, useState } from 'react'
import axios from "axios"
import CouponListItem from './CouponListItem';

function CouponList({reload,setReload}) {
    const [coupons, setCoupons] = useState([]);
    useEffect(() => {
      console.log("i am called")
      fetchCoupons();
    }, [reload]);

    const fetchCoupons = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/coupons');
        setCoupons(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <><h1 className='m-4 font-semibold trex'>My Coupons</h1>
      <div className='flex flex-wrap'>
        {coupons && coupons.length && coupons.map((coupon) => (
          <CouponListItem key={coupon._id} coupon={coupon} reload={reload}  setReload={setReload} />
        ))}
      </div></>
    );
  }

export default CouponList