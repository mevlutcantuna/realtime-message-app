import { render, screen } from '../test-utils'
import Header from './Header'

describe('Header tests', () => {
    it('should return users name correctly', () => {
        render(<Header />)
        expect(screen.getByText('ChatApp')).toBeVisible()
    })
})
