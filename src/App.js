import React, { useState } from "react";
import "./App.css";
import { ModalPopup } from "./components/Modal";
import { images } from "./theme/imageConstant";
import { appConstant } from "./theme/appConstant";

let firstMove = false;

const App = () => {
  const [turn, setTurn] = useState(null);
  const [winner, setWinner] = useState(false);

  const onBoxClick = (index) => {
    setTurn((state) => ({
      ...state,
      ["box" + index]:
        turn?.["box" + index] == undefined
          ? !Object?.values(turn ?? {})?.at(-1)
          : turn?.["box" + index],
    }));
  };
  const renderImg = (index) => {
    return turn === null
      ? ""
      : turn?.["box" + index] === undefined
      ? ""
      : turn?.["box" + index]
      ? images.x
      : images.o;
  };

  const arr = Array.from({ length: 9 }, (val, index) => {
    return (
      <div
        key={index}
        selected={turn?.["box" + index]}
        className={`box ${index}`}
        onClick={() => onBoxClick(index)}
      >
        <img src={renderImg(index)} />
      </div>
    );
  });
  let gameData = arr.map(({ props }) => props.selected);

  const checkDiagnolAndDraw = () => {
    //DIAGNOL WIN
    const centerMove = gameData?.[4] ?? null;
    if (
      (gameData?.[0] === centerMove && gameData?.[8] === centerMove) ||
      (gameData?.[2] === centerMove && gameData?.[6] === centerMove)
    ) {
      return centerMove
        ? setWinner(appConstant.xWin)
        : setWinner(appConstant.oWin);
    }
    //DRAW
    if (Object.keys(turn ?? {}).length === 9) {
      setWinner(appConstant.draw);
    }
  };
  const checkHorzontalWin = () => {
    for (let i = 0; i <= 6; ) {
      if (gameData?.[i] && gameData?.[i + 1] && gameData?.[i + 2]) {
        setWinner(appConstant.xWin);
        break;
      } else if (
        gameData?.[i] === false &&
        gameData?.[i + 1] === false &&
        gameData?.[i + 2] === false
      ) {
        setWinner(appConstant.oWin);
        break;
      }

      i += 3;
    }
  };
  const checkVerticalWin = () => {
    for (let i = 0; i <= 2; i++) {
      if (gameData?.[0 + i] && gameData?.[3 + i] && gameData?.[6 + i]) {
        setWinner(appConstant.xWin);
        break;
      } else if (
        gameData?.[0 + i] === false &&
        gameData?.[i + 3] === false &&
        gameData?.[i + 6] === false
      ) {
        setWinner(appConstant.oWin);
        break;
      }
    }
  };
  const playerTurn = () => {
    return !Object?.values(turn ?? {})?.at(-1)
      ? appConstant.xturn
      : appConstant.oturn;
  };
  const modalResponse = () => {
    setTurn(null);
    setWinner(false);
  };

  React.useEffect(() => {
    checkHorzontalWin();
    checkVerticalWin();
    checkDiagnolAndDraw();
  }, [turn]);

  return (
    <>
      <div className="App">
        <h1 className="playerTurn">{playerTurn()}</h1>
        <div className="container">{arr}</div>
        <button className="Reset_btn" onClick={() => setTurn(null)}>
          RESET
        </button>
      </div>
      {winner && (
        <ModalPopup msg={winner} open={winner} onBtnClick={modalResponse} />
      )}
    </>
  );
};

export default App;
