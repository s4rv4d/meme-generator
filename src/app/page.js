"use client";
import { useState, useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox, Resizable } from "react-resizable";
import "/Users/sarvadshetty/Documents/nextJsStuff/meme-gen-2/node_modules/react-resizable/css/styles.css";
import html2canvas from "html2canvas";

export default function Home() {
  const [imageSrc, setImageSrc] = useState(null); // To store the uploaded image source
  const [topText, setTopText] = useState(""); // To store the top text
  const [bottomText, setBottomText] = useState(""); // To store the bottom text
  const [bounds, setBounds] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });
  const [resizeFirstBounds, setResizeFirstBounds] = useState({
    width: 200,
    height: 200,
  });
  const [resizeSecondBounds, setResizeSecondBounds] = useState({
    width: 200,
    height: 200,
  });

  const imageRef = useRef(null);
  const memeRef = useRef(null);

  // Function to handle image file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // On top layout
  const onResizeFirstLabel = (event, { node, size, handle }) => {
    setResizeFirstBounds({ width: size.width, height: size.height });
  };
  const onResizeSecondLabel = (event, { node, size, handle }) => {
    setResizeSecondBounds({ width: size.width, height: size.height });
  };

  const exportMeme = () => {
    if (memeRef.current) {
      html2canvas(memeRef.current, { backgroundColor: null }).then((canvas) => {
        // Create an image from the canvas
        const image = canvas.toDataURL("image/png");

        // Create a link to download the image
        const link = document.createElement("a");
        link.href = image;
        link.download = "meme.png"; // Specify the download file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  return (
    <div style={{ background: "green" }}>
      <h1>Meme Generator</h1>
      <input type="file" onChange={handleImageChange} />
      <input
        type="text"
        placeholder="Top text"
        value={topText}
        onChange={(e) => setTopText(e.target.value)}
      />
      <input
        type="text"
        placeholder="Bottom text"
        value={bottomText}
        onChange={(e) => setBottomText(e.target.value)}
      />
      <button onClick={exportMeme}>Export Meme</button>
      {imageSrc && (
        <div
          ref={memeRef}
          style={{
            position: "absolute",
            textAlign: "center",
            userSelect: "none",
          }}
        >
          <img
            ref={imageRef}
            src={imageSrc}
            alt="Meme"
            style={{ width: "400px", maxHeight: "400px" }}
          />
          <Draggable bounds="parent" defaultPosition={{ x: 0, y: -110 }}>
            <Resizable
              height={resizeFirstBounds.height}
              width={resizeFirstBounds.width}
              onResize={onResizeFirstLabel}
            >
              <h2
                style={{
                  position: "absolute",
                  cursor: "move",
                  background: "transparent",
                  width: resizeFirstBounds.width + "px",
                  height: resizeFirstBounds.height + "px",
                  whiteSpace: "normal", // Allows text to wrap rather than overflow
                  overflowWrap: "break-word", // Ensures long words do not overflow
                  padding: "4px",
                  color: "black",
                }}
              >
                {topText}
              </h2>
            </Resizable>
          </Draggable>
          <Draggable bounds="parent" defaultPosition={{ x: 0, y: 0 }}>
            <Resizable
              height={resizeSecondBounds.height}
              width={resizeSecondBounds.width}
              onResize={onResizeSecondLabel}
            >
              <h2
                style={{
                  position: "absolute",
                  cursor: "move",
                  background: "transparent",
                  width: resizeSecondBounds.width + "px",
                  height: resizeSecondBounds.height + "px",
                  whiteSpace: "normal", // Allows text to wrap rather than overflow
                  overflowWrap: "break-word", // Ensures long words do not overflow
                  padding: "4px",
                  color: "black",
                }}
              >
                {bottomText}
              </h2>
            </Resizable>
          </Draggable>
        </div>
      )}
    </div>
  );
}
