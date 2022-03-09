import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

function TestEmail() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_0ie23rf', 'template_w9cr2cw', form.current, 'T_5rmfEm7kBXucg1B')
      .then((result) => {
          alert('Email sent Successfully!')
      }, (error) => {
          alert(error.text);
      });
  };

  return (
    <div className="App">
        <h3>Gmail Form</h3>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default TestEmail;
