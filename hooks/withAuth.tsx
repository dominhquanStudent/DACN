import React from "react";
import requireAuth from "@/hooks/requireAuth";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const auth = requireAuth();

    if (!auth) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;