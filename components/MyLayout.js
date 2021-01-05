import Header from "./Header";
import Head from "next/head";

const Layout = props => (
  <div className="layout-base">
    <Header />
    <div>{props.children}</div>
  </div>
);

export default Layout;
