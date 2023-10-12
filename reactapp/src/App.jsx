import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "./components/CustomButton";

function App() {
  const [id, setId] = useState(0);
  const [phrase, setPhrase] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [accessTime, setAccessTime] = useState(new Date());
  const [reactionTime, setReactionTime] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [userIpAddress, setUserIpAddress] = useState("");

  useEffect(() => {
    const apiUrl = "https://localhost:7195";

    fetchColorAndSetBackground(`${apiUrl}/api/colors/getrandomrainbowcolors`)

    /* -------------------------------------------------------------------------- */

    // fetchColorAndSetBackground(`${apiUrl}/api/colors/generate`);

    // fetchColorAndSetTextColor(`${apiUrl}/api/colors/generate`);

    return () => {
      console.log("🚀 ~ file: App.jsx ~ return ~ cleanup");
    };
  }, []);

  const fetchColorAndSetBackground = (url) => {
    fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa.");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data)
      setBackgroundColor(data.backgroundColor);
      setTextColor(data.textColor);
      // console.log(backgroundColor)
      // console.log(TextColor)
    })
    .catch((error) => {
      console.error(`Error in ${url} request:`, error);
    });
  };

  const fetchColorAndSetBackground_1 = (url) => {
    // Realiza la solicitud GET para el color de fondo
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa.");
        }
        return response.json(); // Parsea la respuesta JSON
      })
      .then((data) => {
        // Imprime los valores recibidos en la consola
        console.log(`Color for ${url}:`, data);
  
        // Convierte los valores en una cadena RGB
        const backgroundColor = `rgb(${data.red}, ${data.green}, ${data.blue})`;
  
        // Aquí puedes aplicar la lógica que necesites con el color
        // Por ejemplo, configurar el color de fondo en tu componente.
        setBackgroundColor(backgroundColor);
      })
      .catch((error) => {
        console.error(`Error in ${url} request:`, error);
      });
  };
  
  const fetchColorAndSetTextColor_1 = (url) => {
  
    // Realiza la solicitud GET para el color del texto
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa.");
        }
        return response.json(); // Parsea la respuesta JSON
      })
      .then((data) => {
        // Imprime los valores recibidos en la consola
        console.log(`Text color for ${url}:`, data);
  
        // Convierte los valores en una cadena RGB
        const textColor = `rgb(${data.red}, ${data.green}, ${data.blue})`;
  
        // Aplica la lógica que necesites con el color de texto.
        setTextColor(textColor);
      })
      .catch((error) => {
        console.error(`Error in ${url} request:`, error);
      });
  };
  

  const mainStyle = {
    "--background-color": backgroundColor,
  };

  const paragraphStyle = {
    "--text-color": textColor,
  };

  const handleClick = () => {
    // Esta función se ejecutará cuando se haga clic en un botón
    console.log("Hola"); // Imprime "Hola" en la consola
  };

  return (
    <>
      <div className="main" style={mainStyle}>
        <p style={paragraphStyle}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
          suscipit molestiae modi distinctio necessitatibus at, ad eligendi
          eveniet enim laboriosam doloribus autem voluptas incidunt aliquid,
          doloremque quae? Unde, culpa error?
        </p>
      </div>
      <div className="buttons">
        <CustomButton
          text="Like"
          icon={faHeart}
          onClick={handleClick}
        />
        <CustomButton
          text="Dislike"
          icon={faHeartCrack}
          onClick={() => alert("Haz hecho clic")}
        />
      </div>
    </>
  );
}

export default App;
