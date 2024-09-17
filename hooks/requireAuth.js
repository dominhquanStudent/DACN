import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useAuth } from "@/context/authProvider"; // Ensure correct import

const requireAuth = () => {
  const router = useRouter();
  const { auth } = useAuth();
  console.log(auth);
  useEffect(() => {
    const token = getCookie("jwt");
    if (!token) {
      router.push("/Login");
    }
  }, [router, auth]);

  return auth;
};

export default requireAuth;