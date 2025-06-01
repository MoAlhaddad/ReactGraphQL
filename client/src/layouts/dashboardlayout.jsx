import { useUser } from "@clerk/clerk-react";
import { useSyncClerkUser } from "../hooks/useSyncUser";

const DashboardLayout = ({ children }) => {
  const { isSignedIn } = useUser();

  // Run sync only if signed in
  if (isSignedIn) {
    useSyncClerkUser();
  }

  return <div>{children}</div>;
};

export default DashboardLayout;
