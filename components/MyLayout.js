import Header from "./Header";
import Head from "next/head";

const Layout = props => (
  <>
    <Header />
    <div className="container layout-base" id="tippity-top">
      <div>{props.children}</div>
      <div className="row justify-content-center p-1">
        <div className="container mt-5 pt-5 col-12" id="footer-container">
          <p className="made-with-love">
            made with <i className="fas fa-heart"></i> by tyler samuelson
          </p>
        </div>
      </div>
    </div>
  </>
);

export default Layout;
