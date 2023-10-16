import { useState, useEffect } from "react";
/*import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";*/
import { CustomButton, CustomButton2 } from "./components/CustomButton";

function App() {
  // Estados iniciales
  const [id] = useState(0);
  const [phrase] = useState("phrase");
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

  //PRUBA HORA

  useEffect(() => {
    // fetchPhrase(`${apiUrl}/api/phrase/getphrase`);
    fetchColors(`${apiUrl}/api/colors/getrandomrainbowcolors`);
    setAccessTime(new Date());
    fetchUserLocation(`${apiUrl}/api/geolocation/userlocation`);

    return () => {
      console.log("🚀 ~ file: App.jsx ~ return ~ cleanup");
    };
  }, []);

  //const fetchPhrase = (url) => {
  //  fetch(url)
  //    .then((response) => {
  //      if (!response.ok) {
  //        throw new Error("La solicitud no fue exitosa.");
  //      }
  //      return response.json();
  //    })
  //    .then((data) => {
  //      setPhrase(data.phrase);
  //    })
  //    .catch((error) => {
  //      console.error(`Error in ${url} request:`, error);
  //    });
  //};

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
    const timeDifference = currentTime - accessTime;
    //const formattedAccessTime = accessTime.toISOString();

    // Actualiza los estados de reacción y tiempo
    setReaction(isLike);
    setReactionTime(timeDifference);
    //setAccessTime(formattedAccessTime);

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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat id
              laudantium ut laboriosam error odit minima maiores quos porro
              eveniet officia accusamus animi praesentium quis aspernatur
              repellat fugit quod voluptatem
              <br />
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
