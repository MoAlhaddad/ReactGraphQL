import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { request, gql } from "graphql-request";

export const useSyncClerkUser = () => {
  const { user } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (!user) return;

      const mutation = gql`
        mutation SyncClerkUser($email: String!, $clerkId: String!) {
          syncClerkUser(email: $email, clerkId: $clerkId) {
            success
            message
          }
        }
      `;

      try {
        const response = await request("http://localhost:5000/", mutation, {
          email: user.primaryEmailAddress.emailAddress,
          clerkId: user.id,
        });

        console.log("✅ Sync response:", response);
      } catch (err) {
        console.error("❌ Failed to sync user:", err);
      }
    };

    syncUser();
  }, [user]);
};
