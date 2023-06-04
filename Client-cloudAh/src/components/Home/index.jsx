import React from "react";
import SliderComponent from "../Session/Sliders";
import Brand from "./Brand/Brand";
import Categories from "./Categories/Categories";
// import Categories from "./Categories/Categories";
import SliderProducts from "./SliderProducts/SliderProducts";
import Testimonials from "./Testimonials/Testimonials";
import Work from "./Work/Work";
import { useUser } from "../../Hook/useUser";
const index = () => {
  const { add } = useUser((state) => state);
  React.useEffect(() => {
    const getUser = () => {
      fetch("http://127.0.0.1:8080/customers/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error("authentication failed!");
        })
        .then((resObject) => {
          // setUsers(resObject.user);
          console.log("res", resObject.user);
          console.log("Token:", resObject.cookie["connect.sid"]);
          localStorage.setItem(
            "cookie-google",
            resObject.cookie["connect.sid"]
          );
          add(resObject.user);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUser();
  }, []);
  // console.log("getCookies ", users);
  return (
    <div>
      <SliderComponent />
      <Work />
      <SliderProducts />
      <Categories />
      <Testimonials />
      <Brand />
    </div>
  );
};

export default index;
