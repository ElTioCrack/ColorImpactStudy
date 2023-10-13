import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "./components/CustomButton";

function App() {
  const [id, setId] = useState(0);
  const [phrase, setPhrase] = useState("phrase");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [accessTime, setAccessTime] = useState(new Date());
  const [reactionTime, setReactionTime] = useState(0);
  const [reaction, setReaction] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [userIpAddress, setUserIpAddress] = useState("");

  const apiUrl = "https://localhost:7195";

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

  const mainStyle = {
    "--background-color": backgroundColor,
  };

  const paragraphStyle = {
    "--text-color": textColor,
  };

  const handleClick = (isLike) => {
    const formattedAccessTime = currentTime.toISOString();
    const currentTime = new Date();
    const timeDifference = currentTime - accessTime;
    setReactionTime(timeDifference);
    setReaction(isLike);
    setAccessTime(formattedAccessTime);
    const userData = {
      // id,
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
      <div className="main" style={mainStyle}>
        <p style={paragraphStyle}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
          suscipit molestiae modi distinctio necessitatibus at, ad eligendi
          eveniet enim laboriosam doloribus autem voluptas incidunt aliquid,
          doloremque quae? Unde, culpa error?
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
    </>
  );
}

export default App;
