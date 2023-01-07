import { Ship } from './ship'
import { Gameboard } from './gameboard'

describe.skip('Ship factory function', () => {
  const ship = Ship(2)
  ship.hit()
  const prevhit = ship.hits
  ship.hit()

  test('Must return an object', () => {
    expect(typeof (ship)).toBe('object')
  })

  test('Length must be between 1 and 5', () => {
    expect(Ship(0) && Ship(6)).toBe('Invalid length')
  })

  test('Total hits increase after being hit', () => {
    expect(ship.hits).not.toEqual(prevhit)
  })

  test('Sunk if hits equal ship length', () => {
    expect(ship.isSunk()).toBeTruthy()
  })
})

describe('Gameboard factory function', () => {
  const gameboard = Gameboard()

  describe.skip('place method', () => {
    const carrier = Ship(5)
    gameboard.place([0, 0], [0, 4])
    gameboard.place([5, 5], [5, 5])
    gameboard.place([7, 3], [7, 3])

    test('Should able to place a ship in passed coordinate', () => {
      expect(JSON.stringify(gameboard.ships.carrier)).toStrictEqual(JSON.stringify(carrier))
    })

    test('Cell should know store ships type (0)', () => {
      expect(gameboard.cells[40].ship).toBe('carrier')
    })

    test('Cell should know store ships type (1)', () => {
      expect(gameboard.cells[55].ship).toBe('patrol1')
    })

    test('Cell should know store ships type (2)', () => {
      expect(gameboard.cells[37].ship).toBe('patrol2')
    })
  })

  describe('receiveAttack method', () => {
    gameboard.place([0, 0], [4, 0])
    gameboard.receiveAttack([0, 0])

    test('Able to attack a tiles', () => {
      expect(gameboard.receiveAttack([1, 1])).toBe(0)
    })

    test('Should not be able to attack same tiles', () => {
      expect(gameboard.receiveAttack([0, 0])).toBe(1)
    })

    test('Ship in attacked coordinate take a hit', () => {
      expect(gameboard.ships.carrier.hits).not.toBe(0)
    })
  })
})
