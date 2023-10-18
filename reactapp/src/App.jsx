import { useState, useEffect } from "react";
import { CustomButton, CustomButton2 } from "./components/CustomButton";

function App() {
  // Estados iniciales
  const [id, setId] = useState("0");
  const [phrase, setPhrase] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque nesciunt porro provident libero iusto doloribus debitis, earum aliquam ab facilis dolore numquam asperiores, recusandae similique soluta iure excepturi. Deserunt, voluptatum."
  );
  const [isPhrasePositive, setIsPhrasePositive] = useState(false);
  const [knowsVideoGames, setKnowsVideoGames] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [textColor, setTextColor] = useState("white");
  const [accessTime, setAccessTime] = useState(new Date());
  const [reactionTime, setReactionTime] = useState(0);
  const [reaction, setReaction] = useState(false);
  const [city, setCity] = useState("city");
  const [country, setCountry] = useState("country");
  const [userIpAddress, setUserIpAddress] = useState("192.168.1.1");
  const [visibilityPopUp, setVisibilityPopUp] = useState("flex");

  // URL de la API
  // const apiUrl = "https://localhost:7195";
  const apiUrl = "https://univalleinfo-001-site1.htempurl.com";

  useEffect(() => {
    // Carga la frase inicial, colores y la ubicación del usuario
    fetchInitialData();
    // Verifica si el usuario ya respondió la pregunta de videojuegos
    checkLocalStorageForVideoGames();
    // Limpia cuando el componente se desmonta
    return () => {
      console.log("🚀 ~ file: App.jsx ~ return ~ cleanup");
    };
  }, []);

  const fetchInitialData = () => {
    fetchPhraseData(`${apiUrl}/api/Phrase`);
    fetchColorsData(`${apiUrl}/api/colors/getrandomrainbowcolors`);
    fetchUserLocationData(`${apiUrl}/api/geolocation/userlocation`);
  };

  const fetchPhraseData = (url) => {
    fetchApiData(url, (data) => {
      setPhrase(data.phrase);
      setIsPhrasePositive(data.isPhrasePositive);
    });
  };

  const fetchColorsData = (url) => {
    fetchApiData(url, (data) => {
      setBackgroundColor(data.backgroundColor);
      setTextColor(data.textColor);
    });
  };

  const fetchUserLocationData = (url) => {
    fetchApiData(url, (data) => {
      setCity(data.city);
      setCountry(data.country);
      setUserIpAddress(data.ip);
    });
  };

  const fetchApiData = (url, successCallback) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa.");
        }
        return response.json();
      })
      .then((data) => {
        successCallback(data);
      })
      .catch((error) => {
        console.error(`Error in ${url} request:`, error);
      });
  };

  const checkLocalStorageForVideoGames = () => {
    const storedKnowsVideoGames = localStorage.getItem("knowsVideoGames");
    if (storedKnowsVideoGames !== null) {
      setKnowsVideoGames(storedKnowsVideoGames === "true");
      setVisibilityPopUp("none");
    }
  };

  const handleUserResponseToVideoGames = (knowsVideoGamesAnswer) => {
    setVisibilityPopUp("none");
    setKnowsVideoGames(knowsVideoGamesAnswer);
    localStorage.setItem("knowsVideoGames", knowsVideoGamesAnswer);
    console.log(knowsVideoGames);
  };

  const handleReaction = (isLike) => {
    const currentTime = new Date();
    const timeDifference = currentTime - accessTime;
    setReactionTime(timeDifference);
    setReaction(isLike);
  };

  useEffect(() => {
    if (reactionTime !== 0) {
      sendUserDataToApi(`${apiUrl}/api/UserData`);
      console.log("SendUserData");
    }
  }, [reactionTime]);

  const sendUserDataToApi = (url) => {
    const userData = {
      id,
      phrase,
      isPhrasePositive,
      knowsVideoGames,
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

    fetch(url, {
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
        console.log("Respuesta de la API:", data);
      })
      .catch((error) => {
        console.error("Error al enviar los datos a la API:", error);
      });
  };

  return (
    <>
      <div className="CP-containerPopUp" style={{ display: visibilityPopUp }}>
        <div className="popUp">
          <div className="popUpTitle">
            <p>¿Juegas algún video juego?</p>
          </div>
          <div className="popUpButtons">
            <button className="cerrarPopup" onClick={() => handleUserResponseToVideoGames(true)}>SI</button>
            <button className="cerrarPopup" onClick={() => handleUserResponseToVideoGames(false)}>NO</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="CP-title">
          <h2>¿Qué opinas de esta frase generada por una IA?</h2>
        </div>
        <div className="CP-colorPanel">
          <div
            className="CP-colorArea"
            style={{ "--background-color": backgroundColor }}
          >
            <p className="CP-phrase" style={{ "--text-color": textColor }}>
              {phrase}
            </p>
          </div>
        </div>
        <div className="CP-buttons">
          <CustomButton text="Me Gusta" onClick={() => handleReaction(true)} />
          <CustomButton2 text="No me Gusta" onClick={() => handleReaction(false)} />
        </div>
      </div>
    </>
  );
}

export default App;
