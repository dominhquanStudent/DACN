import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useAuth } from "@/context/authProvider"; // Ensure correct import

const useAuth = () => {
  const router = useRouter();
  const { auth } = useAuth();

  useEffect(() => {
    const token = getCookie("jwt");
    if (!token) {
      router.push("/login");
    }
  }, [router, auth]);

  return auth;
};

export default useAuth;