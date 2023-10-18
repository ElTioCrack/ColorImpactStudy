import { useState, useEffect } from "react";
/*import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";*/
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
  const apiUrl = "https://localhost:7195";
  // const apiUrl = "https://univalleinfo-001-site1.htempurl.com";

  //PRUBA HORA
  useEffect(() => {
    fetchPhrase(`${apiUrl}/api/Phrase`);
    fetchColors(`${apiUrl}/api/colors/getrandomrainbowcolors`);
    setAccessTime(new Date());
    console.log("1 accessTime: " + accessTime);
    console.log("1 reactionTime: " + reactionTime);
    fetchUserLocation(`${apiUrl}/api/geolocation/userlocation`);
    checkLocalStorageForVideoGames()
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
        setIsPhrasePositive(data.isPhrasePositive);
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
    // do{
    const currentTime = new Date();
    console.log("2 accessTime: " + accessTime);
    console.log("2 currentTime: " + currentTime);
    const timeDifference = currentTime - accessTime;
    setReactionTime(timeDifference);
    console.log("3 currentTime: " + timeDifference);
    setReaction(isLike);
    
  };

  useEffect(() => {
    if (reactionTime !== 0) {
      SendUserData(`${apiUrl}/api/UserData`);
      console.log("SendUserData");
    }
  }, [reactionTime]);

  const SendUserData = (url) => {
    // Crea un objeto userData con los datos
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

    // Realiza una solicitud POST a la API para enviar el objeto userData
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
        // Maneja la respuesta de la API si es necesario
        console.log("Respuesta de la API:", data);
        alert("Gracias por responder la encuesta.");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al enviar los datos a la API:", error);
      });
  };

  // Verifica si el usuario ya respondió la pregunta de videojuegos
  const checkLocalStorageForVideoGames = () => {
    const storedKnowsVideoGames = localStorage.getItem("knowsVideoGames");
    if (storedKnowsVideoGames !== null) {
      setKnowsVideoGames(storedKnowsVideoGames === "true");
      setVisibilityPopUp("none");
    }
  };

  // Maneja la respuesta del usuario a la pregunta de videojuegos
  const handleUserResponseToVideoGames = (knowsVideoGamesAnswer) => {
    setVisibilityPopUp("none");
    setKnowsVideoGames(knowsVideoGamesAnswer);
    localStorage.setItem("knowsVideoGames", knowsVideoGamesAnswer);
    console.log(knowsVideoGames);
  };

  return (
    <>
      <div className="CP-containerPopUp" style={{display: visibilityPopUp}}>
        <div className="popUp">
          <div className="popUpTitle">
            <p>¿Juegas algun video juego?</p>
          </div>
          <div className="popUpButtons">
            <button className="cerrarPopup" onClick={() => handleUserResponseToVideoGames(true)}>SI</button>
            <button className="cerrarPopup" onClick={() => handleUserResponseToVideoGames(false)}>NO</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="CP-title">
          <h2>¿Qué opinas de esta frase generáda por una IA?</h2>
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
          <CustomButton text="Me Gusta" onClick={() => handleClick(true)} />
          <CustomButton2 text="No me Gusta" onClick={() => handleClick(true)} />
        </div>
      </div>
    </>
  );
}

export default App;
