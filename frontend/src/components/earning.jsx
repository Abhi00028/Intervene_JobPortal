import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEarnings } from "../store/slices/earningsSlice";

const Earnings = () => {
    const dispatch = useDispatch();
    const earnings = useSelector((state) => state.earnings.amount);

    useEffect(() => {
        dispatch(fetchEarnings());
    }, [dispatch]);

    return <div>Your Total Earnings: ${earnings}</div>;
};

export default Earnings;
