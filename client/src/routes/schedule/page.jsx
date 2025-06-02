import DashboardLayout from "../../layouts/dashboardlayout";
import { Footer } from "../../layouts/footer";
import ScheduleComponent from "../../components/ScheduleComponent";


const SchedulePage = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-y-6">
        <h1 className="title">This Weeks Schedule</h1>
        <ScheduleComponent />
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default SchedulePage;