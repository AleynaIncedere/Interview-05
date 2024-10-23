import React, { useEffect, useState, useRef } from "react";
import './styles.css';

function App() {
  const [inputText, setInputText] = useState("");
  const [texts, setTexts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");


  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  
  const handleAddText = () => {
    if (inputText.trim()) {
      setTexts((prevTexts) => [...prevTexts, inputText.trim()]);
      setInputText("");
    }
  };

  
  const handleTextClick = (text) => {
    setSelectedText(text);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedText("");
  };

 
  const modalRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="App">
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      <button onClick={handleAddText}>Add Text</button>

      <ul>
        {texts.map((text, index) => (
          <li key={index} onClick={() => handleTextClick(text)}>
            {text.length > 5 ? text.slice(0, 5) + "..." : text}
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal" ref={modalRef}>
            <h2>{selectedText}</h2>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
