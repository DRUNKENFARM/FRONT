import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import FightButton from "./FightButton.js";

export default function GameBar({ isStart, speed, stamina, setStamina, hStamina, setHStamina }) {
  
  var stoppedX = Number(0);
  var isAttack = false;
  var attackValue = 0;
  var x = 0;
  var interval;
  const image = new Image(20, 50);
  image.src = 'images/soju.png';

  const fighting = useRef();
  fighting.current = false;
  // const [ fighting, setFighting ] = useState(false);

  var canvasRef = useRef(null);
  const draw = ()=> {
    if (x > 405) {
      clearInterval(interval);
      fighting.current = false;
      setStamina(stamina - 30);
    }

    var canvas = canvasRef.current;
    var ctx = canvas?.getContext("2d");
    
    ctx.clearRect(0, 0, 500, 100)

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.strokeStyle = 'rgba(0,153,255,0.4)';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(300, 0, 100, 100);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(330, 0, 40, 100);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.drawImage(image, x, 0, 30, 100);
    ctx.closePath();
    
    console.log(stoppedX);
    stoppedX = x;
    x += speed;
  };

  
  const handleAttack = () => {
    if (315 <= stoppedX && stoppedX <= 335) {
      isAttack = true;
      attackValue = 50;
      console.log("red");
    }

    else if (300 <= stoppedX && stoppedX < 315 || 335 < stoppedX && stoppedX <= 350) {
        isAttack = true;
        attackValue = 30;
        console.log("orange");
    }
    else if (stoppedX === 0) {
      console.log("starting point");
    }
    else {
      attackValue = 30;
      console.log("outside");
    }

    (isAttack)
      ? setHStamina(hStamina-attackValue)
      : setStamina(stamina-attackValue)
  }

  // console.log(`speed: ${speed}`);
  const onFight = () => {
    // setFighting(true);
    fighting.current = true;
    interval = setInterval(draw, 0.01);
  }

  const onStop = () => {
    fighting.current = false;
    clearInterval(interval);
    handleAttack();
  }
 
  return (
    <>
      <canvas ref={canvasRef} width={500} height={100} />
      <br />
      <FightButton hStamina={hStamina} fight={fighting} onFight={onFight} onStop={onStop}/>
    </>
  );
}