import React from "react";
import useAuth from "@/hooks/useAuth";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const auth = useAuth();

    if (!auth) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;