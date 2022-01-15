import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function GameBar({ isStart, speed, stamina, setStamina, hStamina, setHStamina }) {
  
  var stoppedX = Number(0);
  var isAttack = false;
  var attackValue = 0;
  var x = 0;
  var interval;


  var canvasRef = useRef(null);
  const draw = ()=> {
    if (x > 405) {
      clearInterval(interval);
      setStamina(stamina = stamina-30);
    }

    var canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, 500, 50)

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.strokeStyle = 'rgba(0,153,255,0.4)';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(300, 0, 50, 50);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(315, 0, 20, 50);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(x, 0, 10, 50);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    
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

  
  return (
    <>
      <canvas ref={canvasRef} width={400} height={50}></canvas><br/>

      <Button onClick={() => {
        interval = setInterval(draw, 0.01);
      }}>
        싸우기
      </Button>
      <Button onClick={() => {
        clearInterval(interval);
        handleAttack();
        console.log(`stoppedX = ${stoppedX}`);
        console.log(`attackValue = ${attackValue}`)
        }}
      >
        멈추기
      </Button>
    </>
  );
}