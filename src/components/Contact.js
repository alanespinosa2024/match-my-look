import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_9dr5xnf", // ✅ Service ID
        "template_25qbjer", // ✅ Template ID
        e.target,
        "opd0NyUrt1UHg6IWA" // ✅ User ID (Tu API Key de EmailJS)
      )
      .then(
        (result) => {
          setStatus("✅ Mensaje enviado con éxito.");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setStatus("❌ Hubo un error al enviar el mensaje. Intenta nuevamente.");
        }
      );
  };

  return (
    <section className="contact-section">
      <div className="container">
        <h2>Contáctanos</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="input-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Enviar Mensaje
          </button>
        </form>
        {status && <div className="status-message">{status}</div>}
      </div>
    </section>
  );
};

export default Contact;
