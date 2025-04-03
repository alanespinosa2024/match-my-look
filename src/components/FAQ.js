import React from 'react';
import './FAQ.css'; // Asegúrate de tener el archivo CSS para los estilos

const FAQ = () => {
  return (
    <div className="faq-container">
      <h1 className="faq-title">Preguntas Frecuentes</h1>
      <p className="faq-text">
        Aquí encontrarás respuestas a las preguntas más comunes sobre Match My Look.
      </p>
      
      <div className="faq-item">
        <h2 className="faq-question">¿Qué es Match My Look?</h2>
        <p className="faq-answer">
          Match My Look es una plataforma innovadora que conecta a los amantes de la moda con las últimas tendencias, inspirada en los looks de celebridades y figuras icónicas.
        </p>
      </div>
      
      <div className="faq-item">
        <h2 className="faq-question">¿Cómo funciona la plataforma?</h2>
        <p className="faq-answer">
          Los usuarios pueden explorar diferentes looks, hacer clic en "Match" para ver productos relacionados y acceder a opciones de compra directa, todo de forma sencilla y personalizada.
        </p>
      </div>
      
      <div className="faq-item">
        <h2 className="faq-question">¿Cómo puedo colaborar con Match My Look?</h2>
        <p className="faq-answer">
          Si eres una marca o diseñador interesado en colaborar, contáctanos a través de nuestro correo matchmylook2025@gmail.com para explorar las diferentes opciones de colaboración.
        </p>
      </div>
      
      <div className="faq-item">
        <h2 className="faq-question">¿Cómo protegen la privacidad de mis datos?</h2>
        <p className="faq-answer">
          La privacidad de nuestros usuarios es una prioridad. Para más detalles, te invitamos a leer nuestra Política de Privacidad, donde explicamos cómo protegemos tu información.
        </p>
      </div>
      
      <div className="faq-item">
        <h2 className="faq-question">¿Qué tecnologías utiliza Match My Look?</h2>
        <p className="faq-answer">
          Nuestra plataforma está desarrollada con tecnología avanzada, incluyendo inteligencia artificial (como OpenAI ChatGPT-4o), para ofrecer una experiencia interactiva y personalizada.
        </p>
      </div>
    </div>
  );
};

export default FAQ;
