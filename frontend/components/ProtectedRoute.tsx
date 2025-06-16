
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return (
    <>
      <SignedIn>
        <div className="absolute top-4 right-4 z-50">
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
                userButtonPopoverCard: "bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50",
              }
            }}
          />
        </div>
        {children}
      </SignedIn>
      <SignedOut>
        <Navigate to="/auth" replace />
      </SignedOut>
    </>
  );
};

export default ProtectedRoute;
