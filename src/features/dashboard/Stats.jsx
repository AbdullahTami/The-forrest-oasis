import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, cabinCount, numDays }) {
  // 1) Calculating the num of bookings
  const numBookings = bookings.length;

  // 2) Calculating the num of sales
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3) Calculating the num of check-ins
  const checkIns = confirmedStays.length;

  // 4) Calculating the occupancy rate
  const occupancyRate =
    confirmedStays.reduce((acc, cure) => acc + cure.numNights, 0) /
    (numDays * cabinCount);

  //   const occupation = num checked in nights / available all nights

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100) + "%"}
      />
    </>
  );
}

export default Stats;
