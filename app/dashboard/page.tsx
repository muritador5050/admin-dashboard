'use client';
import {
  EarningsChart,
  LatestDeal,
  TotalOrders,
  YearlyProfitPieChart,
} from '../components/chartscomponent';
const Dashboard = () => {
  return (
    <>
      <section className='min-[980px]:flex'>
        <div className='flex flex-col gap-5 min-[980px]:basis-1/2'>
          <EarningsChart />
          <LatestDeal />
        </div>
        <div className='rounded-xl min-[980px]:basis-2/3'>
          <TotalOrders />
        </div>
        <div className='min-[980px]:basis-1/2'>
          <YearlyProfitPieChart />
          <div className='rounded-xl'></div>
        </div>
      </section>
      <section>
        <div></div>
        <div></div>
      </section>
      <section>
        <div></div>
      </section>
    </>
  );
};
//  ;
export default Dashboard;
