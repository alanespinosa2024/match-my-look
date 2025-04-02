import React from 'react';
import './Aboutus.css'; // Asegúrate de tener el archivo CSS para los estilos

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">Acerca de Nosotros</h1>
      <p className="about-text">
        Match My Look! es una plataforma innovadora diseñada para ayudar a los
        amantes de la moda a descubrir y adoptar las últimas tendencias de
        manera sencilla y personalizada. Nos especializamos en explorar los
        looks de celebridades y figuras icónicas de la moda, permitiéndote
        encontrar inspiración para cada ocasión: Fiesta, Trabajo, Sport y
        Casual.
      </p>
      <p className="about-text">
        Si un look va con tu estilo, puedes hacer clic en "Match" para
        descubrir productos relacionados y acceder a opciones de compra
        directa, facilitando la experiencia de encontrar y adquirir prendas y
        accesorios que realmente te representen.
      </p>
      <p className="about-text">
        Nuestra visión es convertirnos en la aplicación de referencia en moda,
        simplificando la exploración de estilos y brindando una experiencia de
        usuario optimizada. Para lograrlo, Match My Look ha sido desarrollado
        con tecnología avanzada, incluyendo OpenAI ChatGPT-4o, lo que nos
        permite ofrecer una experiencia interactiva y dinámica.
      </p>
    </div>
  );
};

export default About;
