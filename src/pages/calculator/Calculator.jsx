import React, { useEffect } from "react";
import { useState } from "react";
import "./Calculator.css";
import { LiaSquareRootAltSolid } from "react-icons/lia";
import { TbMathPi } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Button } from "../../components";
import { History, Memory, Menu } from "../../mainComponents";
import { PiArrowArcLeft } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrClose } from "react-icons/gr";

export default function Calculator({
  showMenu,
  showHistory,
  setShowHistory,
  onMem,
  onSci,
}) {
  const initialState = JSON.parse(localStorage.getItem("list")) || 0;
  const [input, setInput] = useState("");
  const [resultDisplay, setResultDisplay] = useState("0");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState();
  const [checkSign, setCheckSign] = useState("");
  const [showSci, setShowSci] = useState(false);
  const [ans, setAns] = useState(initialState);
  const [deg, setDeg] = useState(false);
  // const [temp, setTemp] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  // const [showHistory, setShowHistory] = useState(false);
  const [switchSide, setSwitchSide] = useState(1);
  const [memory, setMemory] = useState([]);

  const btnArray = [
    // { value: "", type: "" },
    { value: "1", type: "1" },
    { value: "2", type: "1" },
    { value: "3", type: "1" },
    { value: "4", type: "2" },
    { value: "5", type: "2" },
    { value: "6", type: "2" },
    { value: "+", type: "2" },
    { value: "-", type: "2" },
    { value: "7", type: "2" },
    { value: "8", type: "2" },
    { value: "9", type: "2" },
    { value: "*", type: "2" },
    { value: "/", type: "2" },
    { value: "0", type: "3" },
    { value: "(", type: "3" },
    { value: ")", type: "3" },
    { value: "^", type: "3" },
    { value: "%", type: "4" },
    { value: "mod", type: "4" },
  ];
  const sciBtn = [
    // { value: "", Sym: "", text: "", type: "" },
    { value: "", Sym: "sin(", text: "sin", type: "1" },
    { value: "", Sym: "cos(", text: "cos", type: "1" },
    { value: "", Sym: "tan(", text: "tan", type: "1" },
    { value: "", Sym: "sin-1(", text: "sin-1", type: "2" },
    { value: "", Sym: "cos-1(", text: "tan-1", type: "2" },
    { value: "", Sym: "tan-1(", text: "tan-1", type: "2" },
    { value: "", Sym: "ln(", text: "ln", type: "3" },
    { value: "", Sym: "log(", text: "log", type: "3" },
    { value: "", Sym: "!", text: "!", type: "3" },
    { value: Math.exp(1), Sym: "e", text: "e", type: "4" },
    { value: "", Sym: "e^", text: "e^", type: "4" },
    { value: "", Sym: "ten", text: "10^", type: "4" },
  ];

  //fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api-server-smoky-two.vercel.app/memory`
        );
        const data = await response.json();
        console.log(data);
        // Update the searchResults state with the retrieved data
        setMemory(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // alert(screen);
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    if (width > 700) {
      setShowHistory(true);
    }
  });
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(ans));
  }, [ans]);

  const toggleSci = () => {
    setShowSci(!showSci);
    const sci = document.querySelector(".sci-btn-contain");
    if (showSci) {
      sci.style.display = "flex";
    } else {
      sci.style.display = "none";
    }
  };
  const AddMemory = async (id) => {
    await fetch("https://api-server-smoky-two.vercel.app/memory", {
      method: "POST",
      body: JSON.stringify(history[id]),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMemory((posts) => [data, ...posts]);
        if (data) {
          toast.success("added successfully");
        }
      })
      .catch((err) => {
        console.log("error", err.message);
        if (
          err.message ===
          `Unexpected token 'E', "Error: Ins"... is not valid JSON`
        ) {
          toast.warn("already added to memory");
        } else {
          toast.error("poor internet connection");
        }
      });
  };

  const RemoveMem = async (id) => {
    await fetch(`https://api-server-smoky-two.vercel.app/memory/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          setMemory(
            memory.filter((post) => {
              return post.id !== id;
            })
          );
          toast("item deleted successfully");
        } else {
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("poor internet connection");
      });
    // setConfirm(false)
  };
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
      case "sin(":
        return "sin(";
      case "cos(":
        return "cos(";
      case "tan(":
        return "tan(";
      case "sin-1(":
        return "sin-1(";
      case "cos-1(":
        return "cos-1(";
      case "tan-1(":
        return "tan-1(";
      case "ln(":
        return "ln(";
      case "ten":
        return "10^";
      case "e^":
        return "e^";
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
        const icon = getIcon(checkSign);

        const id = Date.now();
        // setStoreId([...storeId, id]);
        setHistory((prevHistory) => [
          ...prevHistory,
          { id: id, input: input, result: result, icon: icon },
        ]);

        console.log("history", history);
        // console.log("hh", history[1]);
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
      } else if (checkSign.includes("sin(")) {
        const [base, root] = input.split("sin(").map(parseFloat);
        if (!deg) {
          let rad = (base * Math.PI) / 180;
          result = Math.sin(rad);
        } else {
          result = Math.sin(base);
        }
      } else if (checkSign.includes("cos(")) {
        const [base, root] = input.split("cos(").map(parseFloat);
        if (!deg) {
          let rad = (base * Math.PI) / 180;
          result = Math.cos(rad);
        } else {
          result = Math.cos(base);
        }
      } else if (checkSign.includes("tan(")) {
        const [base, root] = input.split("tan(").map(parseFloat);
        if (!deg) {
          let rad = (base * Math.PI) / 180;
          result = Math.tan(rad);
        } else {
          result = Math.tan(base);
        }
      } else if (checkSign.includes("sin-1(")) {
        const [base, root] = input.split("sin-1(").map(parseFloat);
        if (!deg) {
          let rad = (base * Math.PI) / 180;
          result = Math.asin(rad);
        } else {
          result = Math.asin(base);
        }
      } else if (checkSign.includes("cos-1(")) {
        const [base, root] = input.split("cos-1(").map(parseFloat);
        if (!deg) {
          let rad = (base * Math.PI) / 180;
          result = Math.acos(rad);
        } else {
          result = Math.acos(base);
        }
      } else if (checkSign.includes("tan-1(")) {
        const [base, root] = input.split("tan-1(").map(parseFloat);
        if (!deg) {
          let rad = (base * Math.PI) / 180;
          result = Math.atan(rad);
        } else {
          result = Math.atan(base);
        }
      } else if (checkSign.includes("log(")) {
        const [base, root] = input.split("log(").map(parseFloat);
        result = Math.log10(base);
      } else if (checkSign.includes("ln(")) {
        const [base, root] = input.split("ln(").map(parseFloat);
        result = Math.log(base);
      } else if (checkSign.includes("ten")) {
        const [base, root] = input.split("ten").map(parseFloat);
        result = 10 ** base;
      } else if (checkSign.includes("e^")) {
        const [base, root] = input.split("e^").map(parseFloat);
        result = Math.exp(base);
      } else if (checkSign.includes("!")) {
        const [base, root] = input.split("!").map(parseFloat);
        let factorial = base;
        for (let i = 1; i < base; i++) {
          factorial *= i;
        }
        result = factorial;
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
      <div className="calc">
        <section className="screen-section">
          <figure className="screen">
            <span className="in-screen">
              {checkSign === "1/x" && "1/("}
              {checkSign === "sqrt" && <LiaSquareRootAltSolid />}
              {checkSign === "sin(" && "sin("}
              {checkSign === "cos(" && "cos("}
              {checkSign === "tan(" && "tan("}
              {checkSign === "sin-1(" && "sin-1("}
              {checkSign === "cos-1(" && "cos-1("}
              {checkSign === "tan-1(" && "tan-1("}
              {checkSign === "log(" && "log("}
              {checkSign === "ln(" && "ln("}
              {checkSign === "ten" && "10^"}
              {checkSign === "e^" && "e^"}
            </span>
            {checkSign === "root" ? null : input}
            <span className="in-screen">
              {checkSign === "sqr" && <figure className="sqr">2</figure>}
              {checkSign === "1/x" && ")"}
              {checkSign === "!" && "!"}
              {checkSign === "ln(" && ")"}
              {/* {checkSign === "ten" && "10^"} */}
              {/* {checkSign === "e^" && "e^"} */}
              {checkSign.includes("root") && secondDisplay()}
              {checkSign === "sin(" && ")"}
              {checkSign === "cos(" && ")"}
              {checkSign === "tan(" && ")"}
              {checkSign === "sin-1(" && ")"}
              {checkSign === "cos-1(" && ")"}
              {checkSign === "tan-1(" && ")"}
              {checkSign === "log(" && ")"}
            </span>
          </figure>
          <div className="result">{resultDisplay}</div>
        </section>
        <section className="btn-section">
          <div>
            {btnArray
              .filter((value) => value.type.match("1"))
              .map((element) => (
                <Button
                  text={element.value}
                  className={"calc-btn"}
                  onClick={() => handleInput(element.value)}
                />
              ))}

            <Button
              text={"DEL"}
              className="calc-btn del"
              onClick={() => handleDel()}
            />

            <Button
              text={"C"}
              className="calc-btn clear"
              onClick={() => handleClear()}
            />

            {btnArray
              .filter((value) => value.type.match("2"))
              .map((element) => (
                <Button
                  text={element.value}
                  className={"calc-btn"}
                  onClick={() => handleInput(element.value)}
                />
              ))}

            {btnArray
              .filter((value) => value.type.match("3"))
              .map((element) => (
                <Button
                  text={element.value}
                  className={"calc-btn"}
                  onClick={() => handleInput(element.value)}
                />
              ))}

            <Button
              className={"calc-btn"}
              onClick={() => handleOnclick("sqrt", "")}
              text={<LiaSquareRootAltSolid />}
            />
            <button
              className="calc-btn"
              onClick={() => handleOnclick("root", " ")}
            >
              *<LiaSquareRootAltSolid />
            </button>
            <Button
              className="calc-btn"
              onClick={() => handleOnclick("1/x", " ")}
              text={"1/x"}
            />

            <button
              className="calc-btn sqr-btn"
              onClick={() => handleOnclick("sqr", "")}
            >
              x <span className="sqr">2</span>
            </button>
            <button className="calc-btn" onClick={() => handleInput(Math.PI)}>
              <TbMathPi />
            </button>
            {btnArray
              .filter((value) => value.type.match("4"))
              .map((element) => (
                <Button
                  text={element.value}
                  className={"calc-btn"}
                  onClick={() => handleInput(element.value)}
                />
              ))}
            <Button
              className=" calc-btn ans"
              onClick={() => handleInput(ans)}
              text={"ANS"}
            />

            <Button
              className="calc-btn equal"
              onClick={() => handleCalculate()}
              text={"="}
            />
            {onSci && (
              <Button
                onClick={toggleSci}
                className={"calc-btn on-sci"}
                text={<PiArrowArcLeft />}
              />
            )}
          </div>
        </section>
        <section className="sci-btn-contain">
          <figure className="close-sci">
            <button onClick={toggleSci}>&times;</button>
          </figure>
          <div className="sci-btn">
            <section className="sci-toggle">
              {/* <button >DEG</button> */}
              <Button text={deg ? "DEG" : "RAD"} onClick={() => setDeg(!deg)} />
            </section>
            <section className="btn-section-2">
              {sciBtn.map((element, index) => (
                // <button className="calc-btn">{element.text}</button>
                <Button
                  onClick={() => handleOnclick(element.Sym, element.value)}
                  text={element.text}
                />
              ))}
            </section>
          </div>
        </section>
      </div>
      {showHistory && (
        <section className="history">
          <header className="history-header">
            <div>
              <p
                className={switchSide === 1 ? "header-select" : null}
                onClick={() => {
                  setSwitchSide(1);
                }}
              >
                History
              </p>
              {onMem && (
                <p
                  className={switchSide === 2 ? "header-select" : null}
                  onClick={() => setSwitchSide(2)}
                >
                  Memory
                </p>
              )}
            </div>
            {width < 700 && (
              <GrClose
                style={{ cursor: "pointer" }}
                onClick={() => setShowHistory(false)}
              />
            )}
          </header>
          {switchSide === 1 && (
            <History
              history={history}
              title={"History"}
              onClick={AddMemory}
              onMem={onMem}
              handleClear={clearHistory}
            />
          )}
          {switchSide === 2 && (
            <Memory onClick={RemoveMem} memory={memory} loading={loading} />
          )}
        </section>
      )}

      <ToastContainer />
    </main>
  );
}
