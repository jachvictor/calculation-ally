import React, { useEffect } from "react";
import { useState } from "react";
import "./Calculator.css";
import { LiaSquareRootAltSolid } from "react-icons/lia";
import { TbMathPi } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Button } from "../../components";
import { History } from "../../mainComponents";
import { PiTrash, PiTrashBold } from "react-icons/pi";
export default function Calculator() {
  const initialState = JSON.parse(localStorage.getItem("list")) || 0;

  const [input, setInput] = useState("");
  const [resultDisplay, setResultDisplay] = useState("0");
  const [history, setHistory] = useState([]);
  const [checkSign, setCheckSign] = useState("");
  const btnArray = [];
  const [ans, setAns] = useState(initialState);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(ans));
  }, [ans]);

  const handleInput = (value) => {
    setInput((prevInput) => prevInput + value);
  };
  const clearHistory = () => {
    setHistory([]);
  };
  const handleClear = () => {
    console.log("clear");
    setInput("");
    setResultDisplay("0");
    setCheckSign("");
    const back = document.querySelector(".calc");
    // back.style.backgroundColor="red"
  };

  const handleDel = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
    setCheckSign("");
  };

  const getIcon = (sign) => {
    switch (sign) {
      case "sqrt":
        return <LiaSquareRootAltSolid />;
      case "sqr":
        return "sqr(";
      case "1/x":
        return "1/";
      case "root":
        return input, "root";
      // Add more cases for other signs/icons
      default:
        return null; // or return a default icon
    }
  };
  const handleResult = (result) => {
    if (isNaN(result)) {
      if (resultDisplay === "0" && input === "") {
        return;
      } else {
        setResultDisplay("Error");
      }
    } else {
      setResultDisplay(String(result));
      window.localStorage.setItem("ans", String(result));
      const answer = window.localStorage.getItem("ans");
      setAns(answer);
      if (resultDisplay === "Error" || input === "Error") {
        return;
      } else {
        // setHistory((prevHistory) => [...prevHistory, { input, result }]);

        const icon = getIcon(checkSign); // Replace this with the actual function to get the icon
        setHistory((prevHistory) => [...prevHistory, { input, result, icon }]);
      }
    }
  };
  const handleCalculate = () => {
    try {
      let result;
      if (checkSign.includes("sqrt")) {
        result = Math.sqrt(parseFloat(input.replace("", "")));
      } else if (input.includes("^")) {
        const [base, exponent] = input.split("^").map(parseFloat);
        result = Math.pow(base, exponent);
      } else if (checkSign.includes("root")) {
        const [root, base] = input.split(" ").map(parseFloat);
        result = Math.pow(base, 1 / root);
      } else if (checkSign.includes("sqr")) {
        const [base, root] = input.split("sqr").map(parseFloat);
        result = base * base;
      } else if (input.includes("mod")) {
        const [dividend, divisor] = input.split("mod").map(parseFloat);
        result = dividend % divisor;
      } else if (input.includes("%")) {
        result = eval(input.replace("%", "/100"));
      } else if (checkSign.includes("1/x")) {
        const [base, root] = input.split("x").map(parseFloat);
        result = 1 / base;
      } else {
        result = eval(input);
      }

      handleResult(result);
    } catch (error) {
      setResultDisplay("Error");
    }
  };
  const handleOnclick = (sign, inputValue) => {
    handleInput(inputValue);
    setCheckSign(sign);
  };
  const secondDisplay = () => {
    const [base, root] = input.split(" ").map(parseFloat);
    return (
      <div>
        {checkSign.includes("root") && (
          <span>
            {isNaN(base) ? "" : base}
            *
            <LiaSquareRootAltSolid />
            {isNaN(root) ? "" : root}
          </span>
        )}
      </div>
    );
  };

  return (
    <main className="cal-contain">
      {/* <input type="text" value={input} readOnly /> */}
      <div className="calc">
        <section className="screen-section">
          <figure className="screen">
            <span className="in-screen">
              {checkSign === "sqrt" && <LiaSquareRootAltSolid />}
              {checkSign === "1/x" && "1/("}
            </span>
            {checkSign === "root" ? null : input}
            <span className="in-screen">
              {checkSign !== "1/x" && (
                <figure className="sqr">{checkSign === "sqr" && "2"}</figure>
              )}
              {checkSign === "1/x" && ")"}
              {checkSign.includes("root") && secondDisplay()}
            </span>
          </figure>
          <div className="result">{resultDisplay}</div>
        </section>
        <section className="btn-section">
          <div>
            <button className="calc-btn" onClick={() => handleInput("1")}>
              1
            </button>
            <button className="calc-btn" onClick={() => handleInput("2")}>
              2
            </button>
            <button className="calc-btn" onClick={() => handleInput("3")}>
              3
            </button>
            <button className="calc-btn del" onClick={() => handleDel()}>
              DEL
            </button>
            <button className="calc-btn clear" onClick={() => handleClear()}>
              C
            </button>

            <button className="calc-btn" onClick={() => handleInput("4")}>
              4
            </button>
            <button className="calc-btn" onClick={() => handleInput("5")}>
              5
            </button>
            <button className="calc-btn" onClick={() => handleInput("6")}>
              6
            </button>
            <button className="calc-btn" onClick={() => handleInput("+")}>
              +
            </button>
            <button className="calc-btn" onClick={() => handleInput("-")}>
              -
            </button>
            <button className="calc-btn" onClick={() => handleInput("7")}>
              7
            </button>
            <button className="calc-btn" onClick={() => handleInput("9")}>
              9
            </button>

            <button className="calc-btn" onClick={() => handleInput("8")}>
              8
            </button>
            <button className="calc-btn" onClick={() => handleInput("/")}>
              /
            </button>
            <button className="calc-btn" onClick={() => handleInput("*")}>
              &times;
            </button>
            <button className="calc-btn" onClick={() => handleInput("0")}>
              0
            </button>

            <button className="calc-btn" onClick={() => handleInput("(")}>
              {"("}
            </button>

            <button className="calc-btn" onClick={() => handleInput(")")}>
              {")"}
            </button>

            <button className="calc-btn" onClick={() => handleInput("^")}>
              ^
            </button>

            <button
              className="calc-btn"
              onClick={() => handleOnclick("sqrt", "")}
            >
              <LiaSquareRootAltSolid />
            </button>
            <button
              className="calc-btn"
              onClick={() => handleOnclick("root", " ")}
            >
              *<LiaSquareRootAltSolid />
            </button>
            <button className="calc-btn" onClick={() => handleInput("%")}>
              %
            </button>
            <button
              className="calc-btn"
              onClick={() => handleOnclick("1/x", " ")}
            >
              1/x
            </button>
            <button className="calc-btn" onClick={() => handleInput(Math.PI)}>
              <TbMathPi />
            </button>
            <button
              className="calc-btn"
              onClick={() => handleOnclick("sqr", "")}
            >
              x2
            </button>
            <button className="calc-btn" onClick={() => handleInput("mod")}>
              mod
            </button>

            <button className=" calc-btn ans" onClick={() => handleInput(ans)}>
              ANS
            </button>

            <button
              className="calc-btn equal"
              onClick={() => handleCalculate()}
            >
              =
            </button>
          </div>
        </section>
      </div>
      <section className="history overflw">
        <History
          history={history}
          title={"History"}
          handleClear={clearHistory}
        />
      </section>
      {width < 700 && (
        <section className="history-mobile overflow">
          <History
            history={history}
            handleClear={clearHistory}
          />
        </section>
      )}
    </main>
  );
}
