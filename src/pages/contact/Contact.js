import React, { useRef } from "react";
import styles from "./Contact.module.scss";
import Card from "../../components/card/Card";
import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          toast.success("Message sent successfully.");
          //Reset inputs
          e.target.reset();
        },
        (error) => {
          toast.error(error.text);
        }
      );
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Your active email"
                required
              />
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Message</label>
              <textarea cols="30" rows="10" name="message"></textarea>
              <button
                type="submit"
                value="Send"
                className="--btn --btn-primary"
              >
                Send Message
              </button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contacts Information</h3>
              <p>
                Fill the form or contact us via other channels listed bellow
              </p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+235 569 8744 222</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>support@eshop.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Ariana, Tunisia</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@OmarESSOUFI</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
