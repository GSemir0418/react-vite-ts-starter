import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from '../components/button/Button'

it('renders correctly', () => {
  const { container } = render(<Button>Hello World</Button>)
  expect(container.firstChild).toMatchSnapshot()
})
