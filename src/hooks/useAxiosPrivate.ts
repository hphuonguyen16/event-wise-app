"use client";
import { axiosPrivate } from "@/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useAxiosPrivate = () => {
  // const refresh = useRefreshToken();
  const { accessToken, setAccessToken, setUser } = useAuth();
  const router = useRouter();
  // const [accessToken, setAccess] = useState<string | null>(null);

  useEffect(() => {
    // setAccess(localStorage.getItem("accessToken"));
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config: any) => {
        // if (!config.headers["Authorization"]) {
        //   if (localStorage.getItem("persist") && !accessToken) {
        //     const newAccesstoken = await refresh();
        //     config.headers["Authorization"] = `Bearer ${newAccesstoken}`;
        //   } else {
        //     config.headers["Authorization"] = `Bearer ${accessToken}`;
        //   }
        // }
        if (localStorage.getItem("accessToken")) {
          config.headers["Authorization"] = `Bearer ${localStorage.getItem(
            "accessToken"
          )}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        const prevRequest = error?.config;

        if (
          error?.response?.status === 403 ||
          error?.response?.status === 401
        ) {
          console.log('11111')
          localStorage.removeItem("persist");
          router.push("/login");
          return axiosPrivate(prevRequest);
        }
        // } else if (error?.response?.status === 404) {
        //   router.push('/page-not-found')
        // } else if (error?.response?.status === 500) {
        //   router.push('/server-error')
        // }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
