import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
  import { useQuery } from "@apollo/client";
  import { GET_USERS } from "../../graphql/queries";
  import { useTheme } from "../../hooks/use-theme";
  import { Footer } from "../../layouts/footer";
  import { generateUploadButton } from "@uploadthing/react";
  
  import {
    CalendarCheck,
    ClipboardList,
    UserCog,
    PencilLine,
    Trash,
    TrendingUp,
  } from "lucide-react";
import EmployeePhotoUploader from "../../components/UploadForm";
  
  const NewEmployeePage = () => {

  
    return (
      <div className="flex flex-col gap-y-4">
        <h1 className="title">Dashboard</h1>
  
        {/* Cards Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <EmployeePhotoUploader />
       </div>
  
        <Footer />
      </div>
    );
  };
  
  export default NewEmployeePage;
  