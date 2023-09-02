import { useEffect, useState } from "react";
import "./App.css";
import Slider from "@mui/material/Slider";
import androidLogo from "./assets/android.png";
import iosLogo from "./assets/apple.png";

const preDefinedArguments = {
  customization: { label: "Customization", winner: "android" },
  features: { label: "Features", winner: "android" },
  apps: { label: "Apps", winner: "ios" },
  excitement: { label: "Excitement", winner: "android" },
  updates: { label: "Updates", winner: "ios" },
  easeOfUse: { label: "Ease Of Use", winner: "ios" },
  ecosystem: { label: "Ecosystem", winner: "ios" },
};
const sliderColors = {
  0: "#FF6969",
  1: "#FF6969",
  2: "#FEFF86",
  3: "#FEFF86",
  4: "#A0C49D",
  5: "#A0C49D",
};

const styles = {
  logoHeight: window.innerWidth / 10,
  main: {
    flex: 1,
    minHeight: "75vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  pointsContainer: { marginTop: 50, fontSize: window.innerWidth / 10 },
  sliderContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  sliderTop: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  sliderTopLeft: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    textAlign: "start",
    fontSize: window.innerHeight / 50,
  },
};

function App() {
  const [values, setValues] = useState({});
  const [androidPoints, setAndroidPoints] = useState(0);
  const [iosPoints, setIosPoints] = useState(0);

  useEffect(() => {
    let a_points = 0;
    let i_points = 0;
    for (const key in values) {
      switch (preDefinedArguments[key].winner) {
        case "android":
          a_points = a_points + values[key];
          break;
        case "ios":
          i_points = i_points + values[key];
          break;
        default:
          a_points = a_points + 0;
          i_points = i_points + 0;
      }
    }
    setAndroidPoints(a_points);
    setIosPoints(i_points);
  }, [values]);

  const iosPointsColor = iosPoints > androidPoints ? "#A0C49D" : "#FF6969";
  const androidPointsColor = androidPoints > iosPoints ? "#A0C49D" : "#FF6969";

  return (
    <div className="App">
      <div
        style={{
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <div style={{ fontSize: 18, paddingTop: "1vh" }}>
          <span style={{ fontWeight: "bold" }}>Disclaimer: </span>This idea is
          taken from MKBHD's YouTube video{" "}
          <a
            href="https://www.youtube.com/watch?v=nHkKJ87FS6s"
            target="_blank"
            rel="noreferrer"
          >
            iPhone vs Android (The Real Winner)!
          </a>
        </div>
        <div style={{ fontSize: 18, marginTop: "1vh" }}>
          <span style={{ fontWeight: "bold" }}>
            How to decide your winner:{" "}
          </span>{" "}
          Rate each categories based on how much you care about them on a scale
          of 0-5. It will automatically sum your given point to the winner of
          each category, and you will have your winner
        </div>
      </div>

      <header className="App-header">
        <div style={styles.main}>
          <div>
            <div>
              <img
                height={styles.logoHeight}
                src={androidLogo}
                alt="android-logo"
              />
            </div>
            <div
              style={{
                ...styles.pointsContainer,
                color: androidPointsColor,
              }}
            >
              {androidPoints}
            </div>
          </div>
        </div>
        <div style={styles.main}>
          <div style={styles.sliderContainer}>
            {Object.keys(preDefinedArguments).map((key) => {
              const sliderColor = sliderColors[values[key]] || "#FF6969";
              const logo =
                preDefinedArguments[key].winner === "android"
                  ? androidLogo
                  : iosLogo;
              return (
                <div>
                  <div style={styles.sliderTop}>
                    <div style={styles.sliderTopLeft}>
                      <div> {preDefinedArguments[key].label}</div>
                      <div style={{ paddingLeft: "1vw" }}>
                        <img height={"20vh"} src={logo} alt="android-logo" />
                      </div>
                    </div>
                    <div>{values[key] ? values[key].toString() : "0"}</div>
                  </div>
                  <div>
                    <Slider
                      aria-label="Temperature"
                      defaultValue={0}
                      onChange={(e) => {
                        setValues((prev) => {
                          return { ...prev, [key]: e.target.value };
                        });
                      }}
                      step={1}
                      marks
                      min={0}
                      max={5}
                      sx={{
                        color: sliderColor,
                        maxWidth: "40vw",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={styles.main}>
          <div>
            <div>
              <img height={styles.logoHeight} src={iosLogo} alt="ios-logo" />
            </div>
            <div style={{ ...styles.pointsContainer, color: iosPointsColor }}>
              {iosPoints}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
