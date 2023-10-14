import React, { useState, useEffect } from "react";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "./components/CustomButton";

function App() {
  // Estados iniciales
  const [id, setId] = useState(0);
  const [phrase, setPhrase] = useState("phrase");
  const [backgroundColor, setBackgroundColor] = useState("black");
  const [textColor, setTextColor] = useState("white");
  const [accessTime, setAccessTime] = useState(new Date());
  const [reactionTime, setReactionTime] = useState(0);
  const [reaction, setReaction] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [userIpAddress, setUserIpAddress] = useState("");

  // URL de la API
  // const apiUrl = "https://localhost:7195";
  const apiUrl = "https://univalleinfo-001-site1.htempurl.com";

  useEffect(() => {
    // fetchPhrase(`${apiUrl}/api/phrase/getphrase`);
    fetchColors(`${apiUrl}/api/colors/getrandomrainbowcolors`);
    setAccessTime(new Date());
    fetchUserLocation(`${apiUrl}/api/geolocation/userlocation`);

    return () => {
      console.log("🚀 ~ file: App.jsx ~ return ~ cleanup");
    };
  }, []);

  const fetchPhrase = (url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa.");
        }
        return response.json();
      })
      .then((data) => {
        setPhrase(data.phrase);
      })
      .catch((error) => {
        console.error(`Error in ${url} request:`, error);
      });
  };

  // Función para cargar colores desde la API
  const fetchColors = (url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa.");
        }
        return response.json();
      })
      .then((data) => {
        setBackgroundColor(data.backgroundColor);
        setTextColor(data.textColor);
      })
      .catch((error) => {
        console.error(`Error in ${url} request:`, error);
      });
  };

  // Función para cargar la ubicación del usuario desde la API
  const fetchUserLocation = (url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa.");
        }
        return response.json();
      })
      .then((data) => {
        setCity(data.city);
        setCountry(data.country);
        setUserIpAddress(data.ip);
      })
      .catch((error) => {
        console.error(`Error in ${url} request:`, error);
      });
  };

  // Maneja el clic en los botones de reacción
  const handleClick = (isLike) => {
    const currentTime = new Date();
    const formattedAccessTime = currentTime.toISOString();
    const timeDifference = currentTime - accessTime;

    // Actualiza los estados de reacción y tiempo
    setReaction(isLike);
    setReactionTime(timeDifference);
    setAccessTime(formattedAccessTime);

    // Crea un objeto userData con los datos
    const userData = {
      id,
      phrase,
      backgroundColor,
      textColor,
      accessTime,
      reactionTime,
      reaction,
      city,
      country,
      userIpAddress,
    };
    console.log(userData);

    // Realiza una solicitud POST a la API para enviar el objeto userData
    fetch(`${apiUrl}/api/UserData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa.");
        }
        return response.json();
      })
      .then((data) => {
        // Maneja la respuesta de la API si es necesario
        console.log("Respuesta de la API:", data);
      })
      .catch((error) => {
        console.error("Error al enviar los datos a la API:", error);
      });
  };

  return (
    <>
      <div className="main" style={{"--background-color": backgroundColor}}>
        <div className="phrase">
          <p style={{"--text-color": textColor}}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
            suscipit molestiae modi distinctio necessitatibus at, ad eligendi
            eveniet enim laboriosam doloribus autem voluptas incidunt aliquid,
            doloremque quae? Unde, culpa error?<br />
            {phrase}
          </p>
        </div>
        <div className="buttons">
          <CustomButton
            text="Like"
            icon={faHeart}
            onClick={() => handleClick(true)}
          />
          <CustomButton
            text="Dislike"
            icon={faHeartCrack}
            onClick={() => handleClick(false)}
          />
        </div>
      </div>
    </>
  );
}

export default App;
