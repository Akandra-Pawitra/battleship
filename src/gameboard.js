import { Ship } from './ship'

export const Gameboard = () => {
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
    submarine: null,
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
        shipType = 'submarine'
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
