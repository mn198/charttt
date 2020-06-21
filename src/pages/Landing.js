import React from 'react';
import Header from './components/Header/Header';
import HeaderLinks from './components/Header/HeaderLinks';

import Container from '@material-ui/core/Container';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  style1: {
    fontSize: "30px",
  },
  style2: {
    fontSize: "20px",
    padding: "6px 50px",
  }
}

const useStyles = makeStyles(styles);

function Landing() {
  const classes = useStyles();

  return (
    <div className="Landing">
      <Header
        routes="/"
        brand="Vẽ biểu đồ"
        rightLinks={<HeaderLinks/>}
        fixed
      />

      <div>
        <Container>
          <Grid container justify="center" alignItems="center">
            <p className={classes.style1}>Ứng dụng đơn giản nhất để tạo biểu đồ</p>            
          </Grid>
          <Grid container justify="center" alignItems="center">
            <Button className={classes.style2} variant="contained" color="primary">Thử ngay!</Button>            
          </Grid>
        </Container>
      </div>
    </div>

  );
}

export default Landing;
