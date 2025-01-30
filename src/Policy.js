import React from "react";
import get_in_touch from "./assets/images/get_in_touch.webp";
import Header from "./Header";
import Footer from "./Footer";
import "react-awesome-slider/dist/styles.css";
import "./css/style2.css";

function Policy() {
  return (
    <>
      {/* header */}
      <Header home={false}></Header>

      <section className="pages_sec">
        <div className="bg_color_9">
          <div className="container pages_header">
            <div className="col_5 left animate__animated animate__slideInLeft">
              <h3 className="color_4">Let us help you. </h3>
              <h1 className="color_3">
                Privacy <span className="color_7">Policy</span>
              </h1>
              <p className="color_7">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div className="col_5 padding_0 text_right right animate__animated animate__slideInRight">
              <img
                src={get_in_touch}
                alt="get_in_touch"
                className="get_in_touch v_align_bottom"
              />
            </div>
          </div>
        </div>
        <div className="bg_color_7">
          <div className="container pages_content color_6 animate__animated animate__fadeIn">
            At Our Life Changer, we take your privacy very seriously. We
            understand that earning money online requires trust, and we are
            committed to protecting your personal information following the
            highest industry standards.
            <br />
            <br />
            When you sign up for our platform, we collect basic information such
            as your name and email address. This information is used to create
            and maintain your account, as well as to keep you informed about new
            earning opportunities and promotions.
            <br />
            <br />
            We also use cookies and other tracking technologies to personalize
            your experience and deliver relevant ads and offers. These cookies
            do not contain any personally identifiable information and are only
            used for analytical purposes.
            <br />
            <br />
            Your personal information is never sold or shared with third-party
            advertisers without your explicit consent. However, we may share
            your information with trusted third-party partners for fraud
            prevention, customer support, and legal compliance.
            <br />
            <br />
            We take all necessary measures to safeguard your personal
            information, including secure servers, firewalls, and encryption
            technologies. In the unlikely event of a data breach, we will
            promptly notify you and take all necessary steps to mitigate any
            potential harm.
            <br />
            <br />
            If you have any questions or concerns about our privacy policy,
            please don't hesitate to contact us. We are committed to ensuring
            the highest levels of transparency and trust in all our interactions
            with our valued users.
          </div>
        </div>
      </section>

      {/* footer */}
      <Footer></Footer>
    </>
  );
}

export default Policy;
