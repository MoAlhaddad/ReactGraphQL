import DashboardLayout from "../../layouts/dashboardlayout";
import { Footer } from "../../layouts/footer";
import ScheduleComponent from "../../components/ScheduleComponent";


const SetUpSchedulePage = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-y-6">
        <h1 className="title">Schedule Management</h1>
        <ScheduleComponent />
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default SetUpSchedulePage;

