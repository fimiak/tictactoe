import React, { Component } from 'react';
import './App.css';
let a = 0;
class App extends Component {
  constructor() {
    super();

    this.state = {
      grid: [null, null, null, null, null, null, null, null,null],
      player: true,
      used: [],
      win: null,
    }

    this.handleClick = this.handleClick.bind(this);
    this.checkWinCondition = this.checkWinCondition.bind(this);
    this.clear = this.clear.bind(this);
  }

  handleClick(n) {
    if (this.state.win != null) {
      return;
    }
    let newGrid = this.state.grid.slice();
    let used = this.state.used;
    let beenUsed = used.filter(u => u === n);
    if (beenUsed.length > 0) {
      console.log(n + ' has already been set');
    } else {
      used.push(n);
      newGrid[n] = this.state.player ? true : false;
      this.setState((prevState) => ({
        grid: newGrid,
        player: !prevState.player,
        used: used,
      }));
    }
    setTimeout(() => this.checkWinCondition(), 0);
  }

  checkWinCondition() {
    let checkGrid = this.state.grid.slice();
    let check = 
      [
        [checkGrid[0], checkGrid[1], checkGrid[2]],
        [checkGrid[3], checkGrid[4], checkGrid[5]],
        [checkGrid[6], checkGrid[7], checkGrid[8]],
        [checkGrid[0], checkGrid[3], checkGrid[6]],
        [checkGrid[1], checkGrid[4], checkGrid[7]],
        [checkGrid[2], checkGrid[5], checkGrid[8]],
        [checkGrid[0], checkGrid[4], checkGrid[8]],
        [checkGrid[2], checkGrid[4], checkGrid[6]]
      ];
    let checked = check.map(arr => {
      let x = arr.filter(n => n === false);
      let o = arr.filter(n => n === true);
      if (x.length === 3) {
        this.setState({ win: false })
      } else if (o.length === 3) {
        this.setState({ win: true } )
      }
    });
  }

  clear() {
    this.setState({
      grid: [null,null,null,null,null,null,null,null,null],
      player: true,
      used: [],
      win: null,
    })
  }

  render() {
    const tds = this.state.grid.map((item, i) => {
      return <td key={i} onClick={() => this.handleClick(i)}>{item != null ? item ? "X" : "O" : ""}</td>
    });
    return (
      <div className="App">
        <h1>Tic Tac Toe</h1>
        <h4>{"Player " + (this.state.player ? 'X': 'O') + "'s turn"}</h4>
        <table>
          <tbody>
            <tr>
              {tds[0]}
              {tds[1]}
              {tds[2]}
            </tr>
            <tr>
              {tds[3]}
              {tds[4]}
              {tds[5]}
            </tr>
            <tr>
              {tds[6]}
              {tds[7]}
              {tds[8]}
            </tr>
          </tbody>
        </table>
        <button onClick={() => this.clear()}>Clear</button>
        <h2>{this.state.win === true ? 'Player X wins!' : '' || this.state.win === false ? 'Player O wins!' : ''}</h2>
        <p>This ReactJS version of TicTacToe written by Tyler James Greve.</p>
      </div>
    );
  }
}

export default App;
