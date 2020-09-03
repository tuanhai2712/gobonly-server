import React, { useEffect } from "react";
import Admin from "./Admin";
import { getJWT } from "@services/Api";
import { postJWT } from "../services/Api";

export default function Layout(props) {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getJWT("/auth/user-profile")
        .then(result => {
          if (result.status !== 200) {
            window.location.href = "/login";
            localStorage.clear();
          }
        })
        .catch(() => {
          localStorage.clear();
          window.location.href = "/login";
        });
    } else window.location.href = "/login";

    /** Check every 25 minutes to refresh the token once */
    const timer = setInterval(() => {
      postJWT("/auth/refresh")
        .then(result => {
          if (result.status !== 200) {
            window.location.href = "/login";
            localStorage.clear();
          } else localStorage.setItem("token", result.data.access_token);
        })
        .catch(() => {
          localStorage.clear();
          window.location.href = "/login";
        });
    }, 18000000);

    /** exit component then clear interval */
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <Admin {...props} />;
}
