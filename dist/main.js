/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Ship = (length) => {\n  if (length < 1 || length > 5) {\n    return 'Invalid length'\n  } else {\n    const hits = 0\n    const sunk = 0\n    const hit = function () {\n      this.hits++\n    }\n    const isSunk = function () {\n      if (this.hits === this.length) this.sunk++\n      return Boolean(this.sunk)\n    }\n    return { length, hits, sunk, hit, isSunk }\n  }\n}\n\nconst Gameboard = () => {\n  const cells = (function () {\n    const arr = []\n    for (let i = 0; i < 100; i++) {\n      const cell = { ship: null }\n      arr.push(cell)\n    }\n    return arr\n  })()\n  const attack = []\n  const ships = {\n    carrier: null,\n    battleship: null,\n    destroyer: null,\n    submarine1: null,\n    submarine2: null,\n    patrol1: null,\n    patrol2: null\n  }\n  const place = function (start, end) {\n    let [cell, shipType] = [[], null]\n    if (end[1] - start[1]) {\n      for (let i = 0; i < (end[1] - start[1] + 1); i++) {\n        cell.push([start[0], start[1] + i])\n      }\n    } else {\n      for (let i = 0; i < (end[0] - start[0] + 1); i++) {\n        cell.push([start[0] + i, start[1]])\n      }\n    }\n    switch (cell.length) {\n      case 5:\n        shipType = 'carrier'\n        break\n      case 4:\n        shipType = 'battleship'\n        break\n      case 3:\n        shipType = 'destroyer'\n        break\n      case 2:\n        if (this.ships.submarine1 === null) {\n          shipType = 'submarine1'\n        } else if (this.ships.submarine2 === null) {\n          shipType = 'submarine2'\n        }\n        break\n      case 1:\n        if (this.ships.patrol1 === null) {\n          shipType = 'patrol1'\n        } else if (this.ships.patrol2 === null) {\n          shipType = 'patrol2'\n        }\n        break\n    }\n    if (this.ships[shipType] === null) {\n      this.ships[shipType] = Ship(cell.length)\n    }\n    for (let i = 0; i < cell.length; i++) {\n      const index = cell[i][0] + (cell[i][1] * 10)\n      this.cells[index].ship = shipType\n    }\n  }\n  const receiveAttack = function (coor) {\n    const index = coor[0] + coor[1] * 10\n    const check = this.attack.includes(index)\n    if (check) {\n      return 1\n    } else {\n      const ship = this.cells[index].ship\n      if (ship) {\n        this.ships[ship].hit()\n        this.ships[ship].isSunk()\n      }\n      this.attack.push(index)\n      return 0\n    }\n  }\n  const allSunk = function () {\n    const arr = []\n    for (const ship in this.ships) {\n      arr.push(ship)\n    }\n    const sunk = []\n    for (const key of arr) {\n      if (this.ships[key]) sunk.push(this.ships[key].sunk)\n    }\n    return sunk.every(val => val === 1)\n  }\n  return { cells, attack, ships, place, receiveAttack, allSunk }\n}\n\nconst DOM = {\n  start: document.querySelector('#start'),\n  board: document.querySelector('.board'),\n  playerGrid: document.querySelector('.player-grid'),\n  botGrid: document.querySelector('.bot-grid'),\n  playerShipSelection: {\n    carrier: {\n      button: document.querySelector('.ship button.carrier'),\n      p: document.querySelector('.ship p.carrier')\n    },\n    battleship: {\n      button: document.querySelector('.ship button.battleship'),\n      p: document.querySelector('.ship p.battleship')\n    },\n    destroyer: {\n      button: document.querySelector('.ship button.destroyer'),\n      p: document.querySelector('.ship p.destroyer')\n    },\n    submarine: {\n      button: document.querySelector('.ship button.submarine'),\n      p: document.querySelector('.ship p.submarine')\n    },\n    patrol: {\n      button: document.querySelector('.ship button.patrol'),\n      p: document.querySelector('.ship p.patrol')\n    }\n  },\n  disableSelection: function () {\n    for (const ship in DOM.playerShipSelection) {\n      DOM.playerShipSelection[ship].button.setAttribute('disabled', '')\n    }\n  },\n  enableSelection: function () {\n    for (const ship in DOM.playerShipSelection) {\n      if (DOM.playerShipSelection[ship].p.textContent !== '0x') {\n        DOM.playerShipSelection[ship].button.removeAttribute('disabled')\n      }\n    }\n  },\n  enableGrid: function (included) {\n    DOM.disableSelection()\n    const playercells = [...document.querySelectorAll('.player-cell')]\n    const occupiedcell = [...document.querySelectorAll('.occupied')]\n    const exclude = []\n    for (const occupied of occupiedcell) {\n      for (const cell of playercells) {\n        if (cell === occupied) {\n          exclude.push(playercells.indexOf(cell))\n        }\n      }\n    }\n    if (included) {\n      for (let i = 0; i < playercells.length; i++) {\n        playercells[i].setAttribute('disabled', '')\n      }\n      for (let i = 0; i < included.length; i++) {\n        playercells[included[i]].removeAttribute('disabled')\n      }\n    } else {\n      for (let i = 0; i < playercells.length; i++) {\n        if (exclude.includes(i)) {\n          continue\n        } else playercells[i].removeAttribute('disabled')\n      }\n    }\n  }\n}\n\nconst Interface = {\n  playerBoard: Gameboard(),\n  botBoard: Gameboard(),\n  state: null,\n  cache: {\n    type: null,\n    coor: [],\n    length: null,\n    valid: []\n  },\n  selectShip: function (length, type) {\n    DOM.enableGrid()\n    Interface.cache.length = length\n    Interface.cache.type = type\n  },\n  sendData: function (coor) {\n    switch (Interface.state) {\n      case 'placing':\n        Interface.cache.coor.push(coor)\n        if (Interface.cache.length > 1) {\n          if (Interface.cache.coor.length === 1) {\n            if ((coor[1] - 1 * Interface.cache.length) >= -1) {\n              for (let i = 1; i < Interface.cache.length; i++) {\n                Interface.cache.valid.push(coor[0] + (coor[1] - i) * 10)\n              }\n            }\n            if ((coor[0] + 1 * Interface.cache.length) <= 10) {\n              for (let i = 1; i < Interface.cache.length; i++) {\n                Interface.cache.valid.push((coor[0] + i) + coor[1] * 10)\n              }\n            }\n            if ((coor[1] + 1 * Interface.cache.length) <= 10) {\n              for (let i = 1; i < Interface.cache.length; i++) {\n                Interface.cache.valid.push(coor[0] + (coor[1] + i) * 10)\n              }\n            }\n            if ((coor[0] - 1 * Interface.cache.length) >= -1) {\n              for (let i = 1; i < Interface.cache.length; i++) {\n                Interface.cache.valid.push((coor[0] - i) + coor[1] * 10)\n              }\n            }\n          } else if (Interface.cache.coor.length === 2) {\n            const start = Interface.cache.coor[0]\n            const firstIndex = start[0] + start[1] * 10\n            const coorIndex = coor[0] + coor[1] * 10\n            const delta = (coorIndex) - (firstIndex)\n            const validIndex = []\n            switch (delta) {\n              case 1:\n                for (let i = 1; i < Interface.cache.length - 1; i++) {\n                  validIndex.push(coorIndex + i * 1)\n                }\n                break\n              case -1:\n                for (let i = 1; i < Interface.cache.length - 1; i++) {\n                  validIndex.push(coorIndex + i * -1)\n                }\n                break\n              case 10:\n                for (let i = 1; i < Interface.cache.length - 1; i++) {\n                  validIndex.push(coorIndex + i * 10)\n                }\n                break\n              case -10:\n                for (let i = 1; i < Interface.cache.length - 1; i++) {\n                  validIndex.push(coorIndex + i * -10)\n                }\n                break\n            }\n            Interface.cache.valid = validIndex\n          }\n          const cells = document.querySelectorAll('.player-cell')\n          cells[coor[0] + coor[1] * 10].setAttribute('class', 'occupied player-cell')\n          DOM.enableGrid(Interface.cache.valid)\n        }\n        // check if position placement is complete\n        if (Interface.cache.coor.length === Interface.cache.length) {\n          const coor = Interface.cache.coor\n          const start = coor[0]\n          const end = coor[coor.length - 1]\n          DOM.playerShipSelection[`${Interface.cache.type}`].p.textContent = '0x'\n          DOM.enableSelection()\n          Interface.playerBoard.place(start, end)\n        }\n        break\n      case 'attacking':\n        //\n        break\n      case 'ended':\n        //\n        break\n    }\n  },\n  init: function () {\n    DOM.start.setAttribute('style', 'display: none')\n    DOM.board.setAttribute('style', 'display: grid')\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        const cell = document.createElement('button')\n        cell.setAttribute('class', 'player-cell')\n        cell.setAttribute('disabled', '')\n        cell.onclick = () => Interface.sendData([j, i])\n        DOM.playerGrid.appendChild(cell)\n      }\n    }\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        const cell = document.createElement('button')\n        cell.setAttribute('disabled', true)\n        cell.onclick = () => Interface.sendData([j, i])\n        DOM.botGrid.appendChild(cell)\n      }\n    }\n    DOM.playerShipSelection.carrier.button.onclick = () => {\n      Interface.selectShip(5, 'carrier')\n    }\n    DOM.playerShipSelection.battleship.button.onclick = () => {\n      Interface.selectShip(4, 'battleship')\n    }\n    DOM.playerShipSelection.destroyer.button.onclick = () => {\n      Interface.selectShip(3, 'destroyer')\n    }\n    DOM.playerShipSelection.submarine.button.onclick = () => {\n      Interface.selectShip(2, 'submarine')\n    }\n    DOM.playerShipSelection.patrol.button.onclick = () => {\n      Interface.selectShip(1, 'patrol')\n    }\n    Interface.state = 'placing'\n  }\n}\n\nconst Bot = {\n  //\n}\n\nDOM.start.onclick = Interface.init()\n\nconst Script = { Ship, Gameboard, Interface, Bot }\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Script);\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;