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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Ship = (length) => {\n  if (length < 1 || length > 5) {\n    return 'Invalid length'\n  } else {\n    const hits = 0\n    const sunk = 0\n    const hit = function () {\n      this.hits++\n    }\n    const isSunk = function () {\n      if (this.hits === this.length) this.sunk++\n      return Boolean(this.sunk)\n    }\n    return { length, hits, sunk, hit, isSunk }\n  }\n}\n\nconst Gameboard = () => {\n  const cells = (function () {\n    const arr = []\n    for (let i = 0; i < 100; i++) {\n      const cell = { ship: null }\n      arr.push(cell)\n    }\n    return arr\n  })()\n  const attack = []\n  const ships = {\n    carrier: null,\n    battleship: null,\n    destroyer: null,\n    submarine1: null,\n    submarine2: null,\n    patrol1: null,\n    patrol2: null\n  }\n  const place = function (start, end) {\n    let [cell, shipType] = [[], null]\n    // get ship position\n    if (end[1] - start[1]) {\n      // vertical\n      for (let i = 0; i < (end[1] - start[1] + 1); i++) {\n        cell.push([start[0], start[1] + i])\n      }\n    } else {\n      // horizontal\n      for (let i = 0; i < (end[0] - start[0] + 1); i++) {\n        cell.push([start[0] + i, start[1]])\n      }\n    }\n    // get ship type\n    switch (cell.length) {\n      case 5:\n        shipType = 'carrier'\n        break\n      case 4:\n        shipType = 'battleship'\n        break\n      case 3:\n        shipType = 'destroyer'\n        break\n      case 2:\n        if (this.ships.submarine1 === null) {\n          shipType = 'submarine1'\n        } else if (this.ships.submarine2 === null) {\n          shipType = 'submarine2'\n        }\n        break\n      case 1:\n        if (this.ships.patrol1 === null) {\n          shipType = 'patrol1'\n        } else if (this.ships.patrol2 === null) {\n          shipType = 'patrol2'\n        }\n        break\n    }\n    // track placed ship\n    if (this.ships[shipType] === null) {\n      this.ships[shipType] = Ship(cell.length)\n    }\n    // occupy cell with ship\n    for (let i = 0; i < cell.length; i++) {\n      const index = cell[i][0] + (cell[i][1] * 10)\n      this.cells[index].ship = shipType\n    }\n  }\n  const receiveAttack = function (coor) {\n    const index = coor[0] + coor[1] * 10\n    const check = this.attack.includes(index)\n    if (check) {\n      return 1\n    } else {\n      const ship = this.cells[index].ship\n      if (ship) {\n        this.ships[ship].hit()\n        this.ships[ship].isSunk()\n      }\n      this.attack.push(index)\n      return 0\n    }\n  }\n  const allSunk = function () {\n    const arr = []\n    for (const ship in this.ships) {\n      arr.push(ship)\n    }\n    const sunk = []\n    for (const key of arr) {\n      if (this.ships[key]) sunk.push(this.ships[key].sunk)\n    }\n    return sunk.every(val => val === 1)\n  }\n  return { cells, attack, ships, place, receiveAttack, allSunk }\n}\n\nconst DOM = {\n  start: document.querySelector('#start'),\n  board: document.querySelector('.board'),\n  playerGrid: document.querySelector('.player-grid'),\n  botGrid: document.querySelector('.bot-grid'),\n  playerShipSelection: {\n    carrier: document.querySelector('.ship button.carrier'),\n    battleship: document.querySelector('.ship button.battleship'),\n    destroyer: document.querySelector('.ship button.destroyer'),\n    submarine1: document.querySelector('.ship button.submarine1'),\n    submarine2: document.querySelector('.ship button.submarine2'),\n    patrol1: document.querySelector('.ship button.patrol1'),\n    patrol2: document.querySelector('.ship button.patrol2')\n  },\n  disableSelection: function () {\n    DOM.playerShipSelection.carrier.setAttribute('disabled', true)\n    DOM.playerShipSelection.battleship.setAttribute('disabled', true)\n    DOM.playerShipSelection.destroyer.setAttribute('disabled', true)\n    DOM.playerShipSelection.submarine1.setAttribute('disabled', true)\n    DOM.playerShipSelection.submarine2.setAttribute('disabled', true)\n    DOM.playerShipSelection.patrol1.setAttribute('disabled', true)\n    DOM.playerShipSelection.patrol2.setAttribute('disabled', true)\n  },\n  enableSelection: function () {\n    DOM.selectShip.carrier.removeAttribute('disabled')\n    DOM.selectShip.battleship.removeAttribute('disabled')\n    DOM.selectShip.destroyer.removeAttribute('disabled')\n    DOM.selectShip.submarine1.removeAttribute('disabled')\n    DOM.selectShip.submarine2.removeAttribute('disabled')\n    DOM.selectShip.patrol1.removeAttribute('disabled')\n    DOM.selectShip.patrol2.removeAttribute('disabled')\n  },\n  enableGrid: function () {\n    DOM.disableSelection()\n  }\n}\n\nconst Interface = {\n  playerBoard: Gameboard(),\n  botBoard: Gameboard(),\n  state: null,\n  selectShip: function () {\n    DOM.enableGrid()\n  },\n  sendData: function (coor, id) {\n    switch (Interface.state) {\n      case 'placing':\n        //\n        break\n      case 'attacking':\n        //\n        break\n      case 'ended':\n        //\n        break\n    }\n  },\n  init: function () {\n    DOM.start.setAttribute('style', 'display: none')\n    DOM.board.setAttribute('style', 'display: grid')\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        const cell = document.createElement('button')\n        cell.value = `${i}${j}`\n        cell.setAttribute('class', 'player-cell')\n        cell.setAttribute('disabled', true)\n        cell.onclick = Interface.sendData([i, j], 1)\n        DOM.playerGrid.appendChild(cell)\n      }\n    }\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        const cell = document.createElement('button')\n        cell.value = `${i}${j}`\n        cell.setAttribute('disabled', true)\n        cell.onclick = Interface.sendData([i, j], 2)\n        DOM.botGrid.appendChild(cell)\n      }\n    }\n    DOM.playerShipSelection.carrier.onclick = Interface.selectShip\n    DOM.playerShipSelection.battleship.onclick = Interface.selectShip\n    DOM.playerShipSelection.destroyer.onclick = Interface.selectShip\n    DOM.playerShipSelection.submarine1.onclick = Interface.selectShip\n    DOM.playerShipSelection.submarine2.onclick = Interface.selectShip\n    DOM.playerShipSelection.patrol1.onclick = Interface.selectShip\n    DOM.playerShipSelection.patrol2.onclick = Interface.selectShip\n    Interface.state = 'placing'\n  }\n}\n\nconst Bot = {\n  //\n}\n\nDOM.start.onclick = Interface.init\n\nconst Script = { Ship, Gameboard, Interface, Bot }\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Script);\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

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