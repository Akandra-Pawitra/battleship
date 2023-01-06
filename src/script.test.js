// run <npx jest --watch> for test in each save
import { script } from './script'

it('test', () => {
  expect(script()).toBe('test')
})
