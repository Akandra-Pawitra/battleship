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
    this.attack.push(index)
    const ship = this.cells[index].ship
    if (ship) {
      this.ships[ship].hit()
      if (this.ships[ship].isSunk()) {
        return [1, ship]
      } else return 1
    } else return 0
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
  wrapper: document.querySelector('.wrapper'),
  play: document.getElementById('play'),
  playercells: [...document.querySelectorAll('.player-cell')],
  botcells: [...document.querySelectorAll('.bot-cell')],
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
  botShipSelection: {
    carrier: {
      button: document.querySelector('.ship2 button.carrier'),
      p: document.querySelector('.ship2 p.carrier')
    },
    battleship: {
      button: document.querySelector('.ship2 button.battleship'),
      p: document.querySelector('.ship2 p.battleship')
    },
    destroyer: {
      button: document.querySelector('.ship2 button.destroyer'),
      p: document.querySelector('.ship2 p.destroyer')
    },
    submarine: {
      button: document.querySelector('.ship2 button.submarine'),
      p: document.querySelector('.ship2 p.submarine')
    },
    patrol: {
      button: document.querySelector('.ship2 button.patrol'),
      p: document.querySelector('.ship2 p.patrol')
    }
  },
  disableSelection: function () {
    for (const ship in DOM.playerShipSelection) {
      DOM.playerShipSelection[ship].button.setAttribute('disabled', '')
    }
  },
  enableSelection: function () {
    const enable = []
    for (const ship in DOM.playerShipSelection) {
      if (DOM.playerShipSelection[ship].p.textContent !== 'x0') {
        enable.push(ship)
      }
    }
    if (enable.length !== 0) {
      for (const ship of enable) {
        DOM.playerShipSelection[ship].button.removeAttribute('disabled')
      }
    } else {
      Interface.attackPhase()
    }
  },
  enableGrid: function (included) {
    DOM.disableSelection()
    const occupiedcell = [...document.querySelectorAll('.occupied')]
    const exclude = []
    for (const occupied of occupiedcell) {
      for (const cell of DOM.playercells) {
        if (cell === occupied) {
          exclude.push(DOM.playercells.indexOf(cell))
        }
      }
    }
    if (included) {
      for (let i = 0; i < DOM.playercells.length; i++) {
        DOM.playercells[i].setAttribute('disabled', '')
      }
      for (let i = 0; i < included.length; i++) {
        DOM.playercells[included[i]].removeAttribute('disabled')
      }
    } else {
      for (let i = 0; i < DOM.playercells.length; i++) {
        if (exclude.includes(i)) {
          continue
        } else DOM.playercells[i].removeAttribute('disabled')
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
  attackPhase: function () {
    DOM.play.removeAttribute('disabled')
    DOM.play.style.color = 'black'
    DOM.play.textContent = 'START'
    DOM.play.onclick = (() => {
      Bot.placeShip()
      DOM.playerShipSelection.carrier.p.textContent = 'x1'
      DOM.playerShipSelection.battleship.p.textContent = 'x1'
      DOM.playerShipSelection.destroyer.p.textContent = 'x1'
      DOM.playerShipSelection.submarine.p.textContent = 'x2'
      DOM.playerShipSelection.patrol.p.textContent = 'x2'

      DOM.playerShipSelection.carrier.button.setAttribute('class', 'carrier disabled')
      DOM.playerShipSelection.battleship.button.setAttribute('class', 'battleship disabled')
      DOM.playerShipSelection.destroyer.button.setAttribute('class', 'destroyer disabled')
      DOM.playerShipSelection.submarine.button.setAttribute('class', 'submarine disabled')
      DOM.playerShipSelection.patrol.button.setAttribute('class', 'patrol disabled')

      DOM.enableSelection()
      DOM.play.setAttribute('style', 'display: none')
      Interface.state = 'attacking'
      const cells = document.querySelectorAll('.bot-cell')
      for (const cell of cells) {
        cell.removeAttribute('disabled')
      }
    })()
  },
  selectShip: function (length, type) {
    DOM.enableGrid()
    Interface.cache.length = length
    Interface.cache.type = type
  },
  sendData: function (coor) {
    switch (Interface.state) {
      case 'placing':
        if (Interface.cache.length > 1) {
          Interface.cache.coor.push(coor)
          if (Interface.cache.coor.length === 1) {
            const length = Interface.cache.length
            const playercells = [...DOM.playercells]
            const occupied = [...document.querySelectorAll('.occupied')]
            if ((coor[1] - 1 * length) >= -1) {
              const top = []
              for (let i = 1; i < length; i++) {
                top.push(coor[0] + (coor[1] - i) * 10)
              }
              let isOccupied = false
              for (const cell of occupied) {
                for (const node of top) {
                  if (playercells[node] === cell) {
                    isOccupied = true
                    break
                  }
                }
              }
              if (!isOccupied) Interface.cache.valid.push(top[0])
            }
            if ((coor[0] + 1 * length) <= 10) {
              const right = []
              for (let i = 1; i < length; i++) {
                right.push((coor[0] + i) + coor[1] * 10)
              }
              let isOccupied = false
              for (const cell of occupied) {
                for (const node of right) {
                  if (playercells[node] === cell) {
                    isOccupied = true
                    break
                  }
                }
              }
              if (!isOccupied) Interface.cache.valid.push(right[0])
            }
            if ((coor[1] + 1 * length) <= 10) {
              const down = []
              for (let i = 1; i < length; i++) {
                down.push(coor[0] + (coor[1] + i) * 10)
              }
              let isOccupied = false
              for (const cell of occupied) {
                for (const node of down) {
                  if (playercells[node] === cell) {
                    isOccupied = true
                    break
                  }
                }
              }
              if (!isOccupied) Interface.cache.valid.push(down[0])
            }
            if ((coor[0] - 1 * length) >= -1) {
              const left = []
              for (let i = 1; i < length; i++) {
                left.push((coor[0] - i) + coor[1] * 10)
              }
              let isOccupied = false
              for (const cell of occupied) {
                for (const node of left) {
                  if (playercells[node] === cell) {
                    isOccupied = true
                    break
                  }
                }
              }
              if (!isOccupied) Interface.cache.valid.push(left[0])
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
          const cells = DOM.playercells
          cells[coor[0] + coor[1] * 10].setAttribute('class', 'occupied player-cell')
          DOM.enableGrid(Interface.cache.valid)
          if (Interface.cache.coor.length === Interface.cache.length) {
            const coor = Interface.cache.coor
            const start = coor[0]
            const end = coor[coor.length - 1]
            const text = DOM.playerShipSelection[`${Interface.cache.type}`].p.textContent
            if (text === 'x2') {
              DOM.playerShipSelection[`${Interface.cache.type}`].p.textContent = 'x1'
            } else {
              DOM.playerShipSelection[`${Interface.cache.type}`].p.textContent = 'x0'
            }
            DOM.enableSelection()
            Interface.playerBoard.place(start, end)
            Interface.cache.coor = []
          }
        } else {
          const cells = DOM.playercells
          cells[coor[0] + coor[1] * 10].setAttribute('class', 'occupied player-cell')
          for (const index of cells) {
            index.setAttribute('disabled', '')
          }
          const text = DOM.playerShipSelection[`${Interface.cache.type}`].p.textContent
          if (text === 'x2') {
            DOM.playerShipSelection[`${Interface.cache.type}`].p.textContent = 'x1'
          } else {
            DOM.playerShipSelection[`${Interface.cache.type}`].p.textContent = 'x0'
          }
          DOM.enableSelection()
          Interface.playerBoard.place(coor, coor)
        }
        break
      case 'attacking':
        {
          const hit = Interface.botBoard.receiveAttack(coor)
          if (hit) {
            DOM.botcells[coor[0] + coor[1] * 10].setAttribute('class', 'bot-cell hit disabled')
            if (hit[1] !== undefined) {
              const ship = hit[1]
              if (ship === 'submarine1' || ship === 'submarine2') {
                const text = DOM.botShipSelection.submarine.p.textContent
                if (text === 'x2') {
                  DOM.botShipSelection.submarine.p.textContent = 'x1'
                } else {
                  DOM.botShipSelection.submarine.p.textContent = 'x0'
                  DOM.botShipSelection.submarine.button.setAttribute('disabled', '')
                }
              } else if (ship === 'patrol1' || ship === 'patrol2') {
                const text = DOM.botShipSelection.patrol.p.textContent
                if (text === 'x2') {
                  DOM.botShipSelection.patrol.p.textContent = 'x1'
                } else {
                  DOM.botShipSelection.patrol.p.textContent = 'x0'
                  DOM.botShipSelection.patrol.button.setAttribute('disabled', '')
                }
              } else {
                DOM.botShipSelection[`${ship}`].button.setAttribute('disabled', '')
                DOM.botShipSelection[`${ship}`].p.textContent = 'x0'
              }
            }
          } else {
            DOM.botcells[coor[0] + coor[1] * 10].setAttribute('class', 'bot-cell missed disabled')
          }
        }
        Interface.botBoard.attack.push(coor[0] + coor[1] * 10)
        for (const cell of DOM.botcells) {
          cell.setAttribute('disabled', '')
        }
        setTimeout(() => {
          Bot.attack()
          for (const cell of DOM.botcells) {
            cell.removeAttribute('disabled')
          }
        }, 500)
        break
      case 'ended':
        //
        break
    }
  }
}

const Bot = {
  shipPosition: [],
  getCoor: function () {
    return Math.floor(Math.random() * 10)
  },
  placeShip: function () {
    function generateShip (length) {
      if (length === 1) {
        let coor = null
        while (true) {
          const x = Bot.getCoor()
          const y = Bot.getCoor()
          const index = x + y * 10
          if (!Bot.shipPosition.includes(index)) {
            Bot.shipPosition.push(index)
            coor = [x, y]
            break
          }
        }
        return [coor, coor]
      } else {
        let [start, end] = [null, null]
        if (length === 2) {
          while (true) {
            const x0 = Bot.getCoor()
            const y0 = Bot.getCoor()
            const index0 = x0 + y0 * 10
            if (Bot.shipPosition.includes(index0)) continue
            else {
              const vertical = Math.floor(Math.random() * 2)
              if (vertical) {
                const y1 = y0 + 1
                if (y1 < 10) {
                  const index1 = x0 + y1 * 10
                  if (Bot.shipPosition.includes(index1)) {
                    continue
                  } else {
                    start = [x0, y0]
                    end = [x0, y1]
                    Bot.shipPosition.push(index0, index1)
                    break
                  }
                }
              } else {
                const x1 = x0 + 1
                if (x1 < 10) {
                  const index1 = x1 + y0 * 10
                  if (Bot.shipPosition.includes(index1)) {
                    continue
                  } else {
                    start = [x0, y0]
                    end = [x1, y0]
                    Bot.shipPosition.push(index0, index1)
                    break
                  }
                }
              }
            }
          }
        } else {
          while (true) {
            const x0 = Bot.getCoor()
            const y0 = Bot.getCoor()
            const index0 = x0 + y0 * 10
            if (Bot.shipPosition.includes(index0)) continue
            else {
              const vertical = Math.floor(Math.random() * 2)
              if (vertical) {
                const y1 = y0 + (length - 1)
                if (y1 < 10) {
                  let valid = true
                  const cells = []
                  for (let i = 1; i < length; i++) {
                    const grid = index0 + 10 * i
                    if (Bot.shipPosition.includes(grid)) valid = false
                    cells.push(grid)
                  }
                  if (valid) {
                    start = [x0, y0]
                    end = [x0, y1]
                    Bot.shipPosition.push(index0, ...cells)
                    break
                  } else continue
                } else continue
              } else {
                const x1 = x0 + (length - 1)
                if (x1 < 10) {
                  let valid = true
                  const cells = []
                  for (let i = 1; i < length; i++) {
                    const grid = index0 + 1 * i
                    if (Bot.shipPosition.includes(grid)) valid = false
                    cells.push(grid)
                  }
                  if (valid) {
                    start = [x0, y0]
                    end = [x1, y0]
                    Bot.shipPosition.push(index0, ...cells)
                    break
                  } else continue
                } else continue
              }
            }
          }
        }
        return [start, end]
      }
    }
    const ca = generateShip(5)
    const bs = generateShip(4)
    const dd = generateShip(3)
    const sa = generateShip(2)
    const sb = generateShip(2)
    const pa = generateShip(1)
    const pb = generateShip(1)

    Interface.botBoard.place(ca[0], ca[1])
    Interface.botBoard.place(bs[0], bs[1])
    Interface.botBoard.place(dd[0], dd[1])
    Interface.botBoard.place(sa[0], sa[1])
    Interface.botBoard.place(sb[0], sb[1])
    Interface.botBoard.place(pa[0], pa[1])
    Interface.botBoard.place(pb[0], pb[1])
  },
  attack: function () {
    let coor = null
    while (true) {
      const index = Math.floor(Math.random() * 100)
      if (Interface.playerBoard.attack.includes(index)) continue
      else {
        coor = index
        break
      }
    }
    const x = coor % 10
    const y = (coor - x) / 10
    {
      const hit = Interface.playerBoard.receiveAttack([x, y])
      if (hit) {
        DOM.playercells[coor].setAttribute('class', 'player-cell hit disabled')
        if (hit[1] !== undefined) {
          const ship = hit[1]
          if (ship === 'submarine1' || ship === 'submarine2') {
            const text = DOM.playerShipSelection.submarine.p.textContent
            if (text === 'x2') {
              DOM.playerShipSelection.submarine.p.textContent = 'x1'
            } else {
              DOM.playerShipSelection.submarine.p.textContent = 'x0'
              DOM.playerShipSelection.submarine.button.setAttribute('disabled', '')
            }
          } else if (ship === 'patrol1' || ship === 'patrol2') {
            const text = DOM.playerShipSelection.patrol.p.textContent
            if (text === 'x2') {
              DOM.playerShipSelection.patrol.p.textContent = 'x1'
            } else {
              DOM.playerShipSelection.patrol.p.textContent = 'x0'
              DOM.playerShipSelection.patrol.button.setAttribute('disabled', '')
            }
          } else {
            DOM.playerShipSelection[`${ship}`].button.setAttribute('disabled', '')
            DOM.playerShipSelection[`${ship}`].p.textContent = 'x0'
          }
        }
      } else {
        DOM.playercells[coor].setAttribute('class', 'player-cell missed disabled')
      }
    }
    Interface.playerBoard.attack.push(coor)
  }
}

;(function setEventToDOM () {
  DOM.start.onclick = () => {
    DOM.start.setAttribute('style', 'display: none')
    DOM.wrapper.setAttribute('style', 'display: grid')
    Interface.state = 'placing'
    ;(function autoGenerateShip () {
      Interface.selectShip(5, 'carrier')
      Interface.sendData([0, 0])
      Interface.sendData([0, 1])
      Interface.sendData([0, 2])
      Interface.sendData([0, 3])
      Interface.sendData([0, 4])
      Interface.selectShip(4, 'battleship')
      Interface.sendData([0, 5])
      Interface.sendData([0, 6])
      Interface.sendData([0, 7])
      Interface.sendData([0, 8])
      Interface.selectShip(3, 'destroyer')
      Interface.sendData([1, 0])
      Interface.sendData([1, 1])
      Interface.sendData([1, 2])
      Interface.selectShip(2, 'submarine')
      Interface.sendData([1, 3])
      Interface.sendData([1, 4])
      Interface.selectShip(2, 'submarine')
      Interface.sendData([1, 5])
      Interface.sendData([1, 6])
      Interface.selectShip(1, 'patrol')
      Interface.sendData([1, 7])
      Interface.selectShip(1, 'patrol')
      Interface.sendData([1, 8])
    })()
  }
  for (const cell of DOM.playercells) {
    cell.onclick = () => {
      const x = +cell.value[0]
      const y = +cell.value[1]
      Interface.sendData([x, y])
    }
  }
  for (const cell of DOM.botcells) {
    cell.onclick = () => {
      const x = +cell.value[0]
      const y = +cell.value[1]
      Interface.sendData([x, y])
    }
  }
  ;(function playerShipSelection () {
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
  })()
})()
