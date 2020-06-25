import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Header from './components/Header/Header';
import HeaderLinks from './components/Header/HeaderLinks';
import Footer from './components/Footer/Footer';
import {Grid, Paper, IconButton, Container, Button, TextField } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip2 from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// speed dial
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

// icon
import BarChartIcon from '@material-ui/icons/BarChart';
import TimelineIcon from '@material-ui/icons/Timeline';
import PieChartIcon from '@material-ui/icons/PieChart';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import TableChartIcon from '@material-ui/icons/TableChart';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
// lib
import BarChart from './pages/BarChart';
import PieChart from './pages/PieChart';
import LineChart from './pages/LineChart';
import AreaChart from './pages/AreaChart';

// 3rd party
import ColorPicker from "material-ui-color-picker";

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'relative',
    backgroundColor: 'white',
    color: 'white',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    },
    '&.MuiFab-primary': {
    }
  },
  hide: {
    display: 'none'
  },
  redtext: {
    color: "#f44336"
  },
  frame: {
    height: "500px"
  },
  right: {
    float: "right"
  },
  left: {
    float: "left"
  }
}));


const THEME = createMuiTheme({
  typography: {
    fontFamily: "'Patrick Hand', cursive",
    fontSize: 16
  }
});

function App() {
  const classes = useStyles();
  const [rows, setRows] = useState([1,2,3]);
  const [data, setData] = useState([]);
  const [xChartPos, setXChartPos] = useState(0);
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState('');
  const [chartType, setChartType] = useState(0);
  const [SpeedDialOpen, setSpeedDialOpen] = useState(false);

  // handle dialog
  const handleClickOpen = () => {
    svgToPNG();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setLink('')
  };
  // -----------

  // handle table rows
  const addRow = () => {
    setRows([...rows, rows[rows.length-1]+1]);
  }
  const removeRow = () => {
    setRows(rows.slice(0, rows.length-1));
    setTimeout(function(){ handleTableChange() }, 500);
  }
  // --------------------

  // handle speed dial
  const handleSpeedDialClose = () => {
    setSpeedDialOpen(false);
  };
  const handleSpeedDialOpen = () => {
    setSpeedDialOpen(true);
  };
  // --------------------

  // handle chart type
  const baseChart = () => {
    switch(chartType){
      case 0:
        return <BarChart data={data} xChartPos={xChartPos}/>
      case 1:
        return <PieChart data={data} xChartPos={xChartPos}/>
      case 2:
        return <LineChart data={data} xChartPos={xChartPos}/>
      case 3:
        return <AreaChart data={data} xChartPos={xChartPos}/>
      default:
        return <BarChart data={data} xChartPos={xChartPos}/>
    }
  }
  const chooseChartType = (type) => {
    const chartType = {bar: 0, pie: 1, line: 2, area: 3};
    setChartType(chartType[type]);    
  }
  const actions = [
    { icon: <BarChartIcon />, name: 'bar' },
    { icon: <PieChartIcon />, name: 'pie' },
    { icon: <TimelineIcon />, name: 'line' },
    { icon: <TableChartIcon />, name: 'area' },
  ];
  // -------------------

  // get value of an element by name
  const getValue = (name) => {
    try{
      return document.getElementsByName(name)[0].value;
    } catch(err){
      return '';
    }
  }

  // get chart svg
  const getSVG = () => {
    var svg = document.querySelectorAll('svg')
    svg[svg.length-1].setAttributeNS(null, "font-family", "'Patrick Hand', cursive")
    return svg[svg.length-1];
  }

  // set delay
  const handleFieldChange = () => {
    setTimeout(() => {
      handleTableChange();
    }, 500);
  }

  // handle rows change
  const handleTableChange = () => {
    if(xChartPos === 0){
      var chartsvg = getSVG();
      setXChartPos(chartsvg.width.baseVal.value/2);
    }

    setData(0);
    const fillStyles = ['hachure', 'solid', 'zigzag', 'cross-hatch', 'dots', 'sunburst', 'dashed', 'zigzag-line']
    var data = [];
    for(var i = 0; i < rows.length; ++i){
      try{
        var name = getValue("name" + i);
        var value = getValue("value" + i);
        var color = document.getElementsByName("color" + i)[0].parentElement.style.color;
        document.getElementsByName("color" + i)[0].value = color;
        var fillStyle = getValue("fillStyle"+i)
        if(isNaN(value)) value = 0
        if(isNaN(fillStyle)) fillStyle = 0
        if(name !== '' || value !== '')
          data.push({name: name, value: value, index: i, color: color, fillStyle: fillStyles[fillStyle]});
      } catch(err){}
    }
    setData(data)
  }

  // convert svg to png
  const svgToPNG = () => {
    var chartsvg = getSVG();
    var svgString = new XMLSerializer().serializeToString(chartsvg);

    var canvas = document.getElementById("canvas");
    canvas.height = chartsvg.height.baseVal.value; // responsive
    canvas.width = chartsvg.width.baseVal.value;  // responsive
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    var img = new Image();
    var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
    var url = URL.createObjectURL(svg);
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        var png = canvas.toDataURL("image/png");
        document.querySelector('#capture').innerHTML = '.';
        document.querySelector('#capture').innerHTML = '<img src="'+png+'"/>';
        setLink(png);
        URL.revokeObjectURL(png);
        
      };
    img.src = url;
  }

  // create download button
  const handleDownload = () => {
    const downloadLink = document.createElement("a");
     downloadLink.href = link;
     downloadLink.download = 'chart.png';
     downloadLink.click();
  }

  return (
    <ThemeProvider theme={THEME}>
    <div className="App">
    <Header
        routes="/"
        brand="Vẽ biểu đồ"
        rightLinks={<HeaderLinks/>}
      />
      <Container>
      <Paper variant="outlined">
      <Grid container direction="row" justify="space-around" alignItems="center">
        <Grid item lg={1}></Grid>
        <Grid item lg={7}>
        <Paper variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên thành phần</TableCell>
                <TableCell>Số liệu</TableCell>
                <TableCell>Màu</TableCell>
                <TableCell>Kiểu tô màu</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    size="small"
                    name={"name" + index}
                    variant="outlined"
                    onChange={handleFieldChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    name={"value" + index}
                    variant="outlined"
                    onChange={handleFieldChange}
                  />
                </TableCell>
                <TableCell>
                <ColorPicker
                  name={"color" + index}
                  defaultValue="rgb(244, 67, 54)"
                  onChange={handleFieldChange}
                  variant="outlined"
                  size="small"
                />
                </TableCell>
                <TableCell>
                  <FormControl variant="outlined" className={classes.formControl} size="small">
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      name={"fillStyle" + index}
                      onChange={handleFieldChange}
                      defaultValue={0}
                    >
                      <MenuItem value={0}>Gạch gạch</MenuItem>
                      <MenuItem value={1}>Tô kín</MenuItem>
                      <MenuItem value={2}>Zigzag</MenuItem>
                      <MenuItem value={3}>Gạch Chéo</MenuItem>
                      <MenuItem value={4}>Chấm chấm</MenuItem>
                      <MenuItem value={5}>Gạch Gạch</MenuItem>
                      <MenuItem value={6}>Nét đứt</MenuItem>
                      <MenuItem value={7}>Đường zigzag</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              ))}
              </TableBody>
          </Table>  
        </Paper>
        <Grid container justify="center" alignItems="center">
          <Tooltip2 title="Thêm một dòng">
            <IconButton color="primary" component="span" onClick={addRow}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip2>
          <Tooltip2 title="Xóa một dòng">
            <IconButton className={classes.redtext} component="span" onClick={removeRow}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Tooltip2>
        </Grid>
        </Grid>
        <Grid item lg={4}>
          <Grid container justify="center" alignItems="center">
            <Grid item sm={12} lg={8}>
              <TextField
                name="title"
                label="Tên biểu đồ"
                variant="outlined"
                multiline
                fullWidth
                onChange={handleFieldChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </Paper>
      
    <Paper variant="outlined">
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial + " " + classes.left}
          hidden={false}
          icon={<MergeTypeIcon/>}
          onClose={handleSpeedDialClose}
          onOpen={handleSpeedDialOpen}
          open={SpeedDialOpen}
          direction={'right'}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {chooseChartType(action.name)}}
            />
          ))}
        </SpeedDial>
      <Button className={classes.right} onClick={handleClickOpen}>Lưu ảnh</Button>
      <Paper variant="outlined">
      { data === 0 ? (<div className={classes.frame} id="frame"></div>):
        baseChart()
      }
      </Paper>
    </Paper>    
    
    <Paper variant="outlined">
      <canvas className={classes.hide} id="canvas" width="1230" height="400"></canvas>
    </Paper>
    </Container>
    </div>
    <Dialog
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Ảnh Chụp"}</DialogTitle>
        <DialogContent>
          <Paper variant="outlined">
            <div id="capture"></div>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDownload} color="primary">
            Tải ảnh
          </Button>
          <Button onClick={handleClose} color="secondary" autoFocus>
            Đã xem
          </Button>
        </DialogActions>
      </Dialog>
    <Footer/>
    </ThemeProvider>

  );
}

export default App;
