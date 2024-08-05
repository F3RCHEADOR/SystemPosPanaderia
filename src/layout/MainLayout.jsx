import React from "react";
import Footer from "../components/Footer";

const MainLayout = ({
  children
}) => {
  return (
    <>
      <main>
        <div className="flex flex-row">

        </div>
        <div className="select-none">{children}</div>
      </main>
      <Footer />
    </>
  )
}

export default MainLayout;