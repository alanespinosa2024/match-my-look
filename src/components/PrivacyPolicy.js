import React from "react";
import './PrivacyPolicy.css'; // Asegúrate de que la ruta sea correcta

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container"> {/* Aplicamos la clase aquí */}
        <h1 className="privacy-policy-title">Política de Privacidad</h1>
        <p className="privacy-policy-text">
        En <strong>Match My Look</strong>, respetamos la privacidad de nuestros
        usuarios y queremos que conozcas cómo manejamos la información en
        nuestra plataforma. <strong>No recopilamos información personal</strong>{" "}
        como nombre, información de contacto o preferencias de estilo. Nuestra
        plataforma ha sido desarrollada con inteligencia artificial avanzada,
        incluyendo <strong>OpenAI ChatGPT-4o</strong>, para brindarte una
        experiencia interactiva y personalizada sin comprometer tu privacidad.
      </p>

      <h2>Uso de Cookies</h2>
      <p>
        Match My Look utiliza cookies para mejorar tu experiencia en el sitio.
        Estas cookies nos ayudan a entender cómo interactúan los usuarios con
        la plataforma, pero no almacenan información personal identificable.
        Puedes gestionar o deshabilitar las cookies desde la configuración de
        tu navegador.
      </p>

      <h2>Enlaces a Terceros</h2>
      <p>
        Nuestro sitio puede incluir enlaces a otras páginas web de terceros para
        que accedas a productos relacionados con los estilos que te gustan. Una
        vez que salgas de nuestra plataforma, no tenemos control sobre el uso de
        datos en esos sitios externos, por lo que te recomendamos revisar sus
        políticas de privacidad antes de proporcionar información personal.
      </p>

      <h2>Seguridad</h2>
      <p>
        En Match My Look nos preocupamos por la seguridad de nuestros usuarios.
        No almacenamos datos personales, y cualquier información sobre estilos y
        tendencias se maneja exclusivamente dentro de la plataforma sin
        identificación de usuarios.
      </p>

      <h2>Actualizaciones de la Política</h2>
      <p>
        Nos reservamos el derecho de modificar esta Política de Privacidad en
        cualquier momento. Cualquier cambio será publicado en esta sección para
        que siempre estés informado sobre cómo protegemos tu privacidad.
      </p>
    </div>
  );  
};

export default PrivacyPolicy;
