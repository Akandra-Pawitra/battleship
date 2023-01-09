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
    if (end[1] - start[1]) {
      for (let i = 0; i < (end[1] - start[1] + 1); i++) {
        cell.push([start[0], start[1] + i])
      }
    } else {
      for (let i = 0; i < (end[0] - start[0] + 1); i++) {
        cell.push([start[0] + i, start[1]])
      }
    }
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
    if (this.ships[shipType] === null) {
      this.ships[shipType] = Ship(cell.length)
    }
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

const DOM = {
  start: document.querySelector('#start'),
  board: document.querySelector('.board'),
  playerGrid: document.querySelector('.player-grid'),
  botGrid: document.querySelector('.bot-grid'),
  playerShipSelection: {
    carrier: {
      button: document.querySelector('.ship button.carrier'),
      p: document.querySelector('.ship p.carrier')
    },
    battleship: {
      button: document.querySelector('.ship button.battleship'),
      p: document.querySelector('.ship p.battleship')
    },
    destroyer: {
      button: document.querySelector('.ship button.destroyer'),
      p: document.querySelector('.ship p.destroyer')
    },
    submarine: {
      button: document.querySelector('.ship button.submarine'),
      p: document.querySelector('.ship p.submarine')
    },
    patrol: {
      button: document.querySelector('.ship button.patrol'),
      p: document.querySelector('.ship p.patrol')
    }
  },
  disableSelection: function () {
    for (const ship in DOM.playerShipSelection) {
      DOM.playerShipSelection[ship].button.setAttribute('disabled', '')
    }
  },
  enableSelection: function () {
    for (const ship in DOM.playerShipSelection) {
      if (DOM.playerShipSelection[ship].p.textContent !== '0x') {
        DOM.playerShipSelection[ship].button.removeAttribute('disabled')
      }
    }
  },
  enableGrid: function (included) {
    DOM.disableSelection()
    const playercells = [...document.querySelectorAll('.player-cell')]
    const occupiedcell = [...document.querySelectorAll('.occupied')]
    const exclude = []
    for (const occupied of occupiedcell) {
      for (const cell of playercells) {
        if (cell === occupied) {
          exclude.push(playercells.indexOf(cell))
        }
      }
    }
    if (included) {
      for (let i = 0; i < playercells.length; i++) {
        playercells[i].setAttribute('disabled', '')
      }
      for (let i = 0; i < included.length; i++) {
        playercells[included[i]].removeAttribute('disabled')
      }
    } else {
      for (let i = 0; i < playercells.length; i++) {
        if (exclude.includes(i)) {
          continue
        } else playercells[i].removeAttribute('disabled')
      }
    }
  }
}

const Interface = {
  playerBoard: Gameboard(),
  botBoard: Gameboard(),
  state: null,
  cache: {
    type: null,
    coor: [],
    length: null,
    valid: []
  },
  selectShip: function (length, type) {
    DOM.enableGrid()
    Interface.cache.length = length
    Interface.cache.type = type
  },
  sendData: function (coor) {
    switch (Interface.state) {
      case 'placing':
        Interface.cache.coor.push(coor)
        if (Interface.cache.length > 1) {
          if (Interface.cache.coor.length === 1) {
            if ((coor[1] - 1 * Interface.cache.length) >= -1) {
              for (let i = 1; i < Interface.cache.length; i++) {
                Interface.cache.valid.push(coor[0] + (coor[1] - i) * 10)
              }
            }
            if ((coor[0] + 1 * Interface.cache.length) <= 10) {
              for (let i = 1; i < Interface.cache.length; i++) {
                Interface.cache.valid.push((coor[0] + i) + coor[1] * 10)
              }
            }
            if ((coor[1] + 1 * Interface.cache.length) <= 10) {
              for (let i = 1; i < Interface.cache.length; i++) {
                Interface.cache.valid.push(coor[0] + (coor[1] + i) * 10)
              }
            }
            if ((coor[0] - 1 * Interface.cache.length) >= -1) {
              for (let i = 1; i < Interface.cache.length; i++) {
                Interface.cache.valid.push((coor[0] - i) + coor[1] * 10)
              }
            }
          } else if (Interface.cache.coor.length === 2) {
            const start = Interface.cache.coor[0]
            const firstIndex = start[0] + start[1] * 10
            const coorIndex = coor[0] + coor[1] * 10
            const delta = (coorIndex) - (firstIndex)
            const validIndex = []
            switch (delta) {
              case 1:
                for (let i = 1; i < Interface.cache.length - 1; i++) {
                  validIndex.push(coorIndex + i * 1)
                }
                break
              case -1:
                for (let i = 1; i < Interface.cache.length - 1; i++) {
                  validIndex.push(coorIndex + i * -1)
                }
                break
              case 10:
                for (let i = 1; i < Interface.cache.length - 1; i++) {
                  validIndex.push(coorIndex + i * 10)
                }
                break
              case -10:
                for (let i = 1; i < Interface.cache.length - 1; i++) {
                  validIndex.push(coorIndex + i * -10)
                }
                break
            }
            Interface.cache.valid = validIndex
          }
          const cells = document.querySelectorAll('.player-cell')
          cells[coor[0] + coor[1] * 10].setAttribute('class', 'occupied player-cell')
          DOM.enableGrid(Interface.cache.valid)
        }
        // check if position placement is complete
        if (Interface.cache.coor.length === Interface.cache.length) {
          const coor = Interface.cache.coor
          const start = coor[0]
          const end = coor[coor.length - 1]
          DOM.playerShipSelection[`${Interface.cache.type}`].p.textContent = '0x'
          DOM.enableSelection()
          Interface.playerBoard.place(start, end)
        }
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
    DOM.start.setAttribute('style', 'display: none')
    DOM.board.setAttribute('style', 'display: grid')
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('button')
        cell.setAttribute('class', 'player-cell')
        cell.setAttribute('disabled', '')
        cell.onclick = () => Interface.sendData([j, i])
        DOM.playerGrid.appendChild(cell)
      }
    }
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('button')
        cell.setAttribute('disabled', true)
        cell.onclick = () => Interface.sendData([j, i])
        DOM.botGrid.appendChild(cell)
      }
    }
    DOM.playerShipSelection.carrier.button.onclick = () => {
      Interface.selectShip(5, 'carrier')
    }
    DOM.playerShipSelection.battleship.button.onclick = () => {
      Interface.selectShip(4, 'battleship')
    }
    DOM.playerShipSelection.destroyer.button.onclick = () => {
      Interface.selectShip(3, 'destroyer')
    }
    DOM.playerShipSelection.submarine.button.onclick = () => {
      Interface.selectShip(2, 'submarine')
    }
    DOM.playerShipSelection.patrol.button.onclick = () => {
      Interface.selectShip(1, 'patrol')
    }
    Interface.state = 'placing'
  }
}

const Bot = {
  //
}

DOM.start.onclick = Interface.init()

const Script = { Ship, Gameboard, Interface, Bot }
export default Script
