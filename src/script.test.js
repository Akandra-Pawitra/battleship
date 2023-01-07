import Script from './script'

describe('Ship factory function', () => {
  const ship = Script.Ship(2)
  ship.hit()
  const prevhit = ship.hits
  ship.hit()

  test('Must return an object', () => {
    expect(typeof (ship)).toBe('object')
  })

  test('Length must be between 2 and 5', () => {
    expect(Script.Ship(1) && Script.Ship(6)).toBe('Invalid length')
  })

  test('Total hits increase after being hit', () => {
    expect(ship.hits).not.toEqual(prevhit)
  })

  test('Sunk if hits equal ship length', () => {
    expect(ship.isSunk()).toBeTruthy()
  })
})
