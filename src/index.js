const Ship = (length) => {
  if (length < 1 || length > 5) {
    return 'Invalid length'
  } else {
    const hits = 0
    const sunk = 0
    const hit = function () {
      this.hits++
    }
    const isSunk = function () {
      if (this.hits === this.length) this.sunk++
      return Boolean(this.sunk)
    }
    return { length, hits, sunk, hit, isSunk }
  }
}

const Gameboard = () => {
  const cells = (function () {
    const arr = []
    for (let i = 0; i < 100; i++) {
      const cell = { ship: null }
      arr.push(cell)
    }
    return arr
  })()
  const attack = []
  const ships = {
    carrier: null,
    battleship: null,
    destroyer: null,
    submarine1: null,
    submarine2: null,
    patrol1: null,
    patrol2: null
  }
  const place = function (start, end) {
    let [cell, shipType] = [[], null]
    // get ship position
    if (end[1] - start[1]) {
      // vertical
      for (let i = 0; i < (end[1] - start[1] + 1); i++) {
        cell.push([start[0], start[1] + i])
      }
    } else {
      // horizontal
      for (let i = 0; i < (end[0] - start[0] + 1); i++) {
        cell.push([start[0] + i, start[1]])
      }
    }
    // get ship type
    switch (cell.length) {
      case 5:
        shipType = 'carrier'
        break
      case 4:
        shipType = 'battleship'
        break
      case 3:
        shipType = 'destroyer'
        break
      case 2:
        if (this.ships.submarine1 === null) {
          shipType = 'submarine1'
        } else if (this.ships.submarine2 === null) {
          shipType = 'submarine2'
        }
        break
      case 1:
        if (this.ships.patrol1 === null) {
          shipType = 'patrol1'
        } else if (this.ships.patrol2 === null) {
          shipType = 'patrol2'
        }
        break
    }
    // track placed ship
    if (this.ships[shipType] === null) {
      this.ships[shipType] = Ship(cell.length)
    }
    // occupy cell with ship
    for (let i = 0; i < cell.length; i++) {
      const index = cell[i][0] + (cell[i][1] * 10)
      this.cells[index].ship = shipType
    }
  }
  const receiveAttack = function (coor) {
    const index = coor[0] + coor[1] * 10
    const check = this.attack.includes(index)
    if (check) {
      return 1
    } else {
      const ship = this.cells[index].ship
      if (ship) {
        this.ships[ship].hit()
        this.ships[ship].isSunk()
      }
      this.attack.push(index)
      return 0
    }
  }
  const allSunk = function () {
    const arr = []
    for (const ship in this.ships) {
      arr.push(ship)
    }
    const sunk = []
    for (const key of arr) {
      if (this.ships[key]) sunk.push(this.ships[key].sunk)
    }
    return sunk.every(val => val === 1)
  }
  return { cells, attack, ships, place, receiveAttack, allSunk }
}

const Interface = {
  player1Board: Gameboard(),
  player2Board: Gameboard(),
  state: null,
  sendData: function (coor, id) {
    switch (this.state) {
      case 'placing':
        //
        break
      case 'attacking':
        //
        break
      case 'ended':
        //
        break
    }
  },
  init: function () {
    start.setAttribute('style', 'display: none')
    board.setAttribute('style', 'display: grid')
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('button')
        cell.value = `${i}${j}` // 00, 01, 02, etc
        cell.onclick = () => Interface.sendData([i, j], 1)
        player1div.appendChild(cell)
      }
    }
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('button')
        cell.value = `${i}${j}` // 00, 01, 02, etc
        cell.onclick = () => Interface.sendData([i, j], 2)
        player2div.appendChild(cell)
      }
    }
    this.state = 'placing'
  }
}

const Bot = {
  //
}

const start = document.querySelector('#init')
const board = document.querySelector('.board')
const player1div = document.querySelector('.player1')
const player2div = document.querySelector('.player2')

start.onclick = Interface.init

const Script = { Ship, Gameboard, Interface, Bot }
export default Script
