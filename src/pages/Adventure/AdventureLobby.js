import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Slide from '@mui/material/Slide';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import '../../style/Lobby.css';
import '../../style/MyFarm.css';
import ProgressBarLobby from '../../components/adventure/ProgressBarLobby';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AdventureLobby({ animal, animalList, setIsLobby, setAnimal, setFloor, stamina, setStamina, setStaminaMAX }) {
  const navigate = useNavigate();
  const [ animalIndex, setAnimalIndex ] = useState(Number(0));

  const [exitOpen, setExitOpen] = useState(false);

  const handleClickExit = (index) => {
    setAnimal(animalList[index]);
    setExitOpen(true);
  };

  const handleCloseNo = () => {
    setExitOpen(false);
  };

  const handleCloseYes = () => {
    setAnimal(animal);
    setStamina(stamina+animal.chae);
    setStaminaMAX(200+animal.chae);
    setFloor(1);
    setIsLobby(false);
    setExitOpen(false);
  };
  
  return (
    <div className="Lobby">
      <div className="LobbyAnimalGrid">
        <Grid style={{ width: "80%", marginTop: "3%" }} container spacing={2}>{
          animalList?.map((animal, index) =>
          <Grid item xs={4}>
              <div className="LobbyCard">
                <Card key={index} style ={{fontFamily:'paybooc'}} sx={{ backgroundColor: 'rgba( 0, 0, 0, 0.7 )'}}>
                  <CardMedia 
                    style ={{fontFamily:'paybooc'}}
                    component="img"
                    image={`/images/${animal.type}.png`}
                    alt={`${animal.type}.png`}
                    onClick={() => handleClickExit(index)} />
                  <CardContent> 
                    <Typography gutterBottom variant="h5" component="div" color="common.white">
                      {animal.name}({animal.sex})
                    </Typography>
                    <Typography variant="body1" color="common.white">
                      <ProgressBarLobby bgcolor="orange" type={"???"} stamina={animal.geee} staminaMAX={300} /><br/>
                      <ProgressBarLobby bgcolor="green" type={"???"} stamina={animal.duck} staminaMAX={300} /><br/>
                      <ProgressBarLobby bgcolor="red" type={"???"} stamina={animal.chae} staminaMAX={300} /><br/>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>)}
        </Grid>
      <HomeIcon className="HomeButton" sx={{ fontSize: 80 }} onClick={() => navigate(-1)} />
      </div>
      <Dialog
        open={exitOpen}
        onClose={handleCloseNo}
        TransitionComponent={Transition} >
        <DialogTitle style ={{fontFamily:'paybooc'}}>{animal?.name}???(???) ?????? ????????? ?????? ???????????????????</DialogTitle>
        <DialogContent>
          <DialogContentText style ={{fontFamily:'paybooc'}}>
            ??????????????? ????????? ????????? ??? ????????????<br/>
            (????????? 0 ?????? ???????????? ????????? ?????? ?????? ????????????)
          </DialogContentText>
        </DialogContent>
        <DialogActions style ={{fontFamily:'paybooc'}}>
          <Button style ={{fontFamily:'paybooc'}} onClick={handleCloseNo}>?????????</Button>
          <Button style ={{fontFamily:'paybooc'}} onClick={() => handleCloseYes()}>???</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}




// animalList?.map((animal, index) =>
//                 <div className="LobbyCard">
//                   <Card key={index} sx={{ backgroundColor: 'rgba( 0, 0, 0, 0.7 )'}}>
//                     <CardMedia 
//                       component="img"
//                       image={`/images/${animal.type}.png`}
//                       alt={`${animal.type}.png`}
//                       onClick={() => handleClickExit(index)}
//                     />
//                     <CardContent> 
//                       <Typography gutterBottom variant="h5" component="div" color="common.white">
//                         {animal.name}({animal.sex})
//                       </Typography>
//                       <Typography variant="body1" color="common.white">
//                           <ProgressBarLobby bgcolor="orange" type={"???"} stamina={animal.geee} staminaMAX={300} /><br/>
//                           <ProgressBarLobby bgcolor="green" type={"???"} stamina={animal.duck} staminaMAX={300} /><br/>
//                           <ProgressBarLobby bgcolor="red" type={"???"} stamina={animal.chae} staminaMAX={300} /><br/>
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </div>
//           )