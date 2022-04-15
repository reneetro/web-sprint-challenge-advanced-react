// Write your tests here
import AppClass from './AppClass';
import React from 'react';
import {render} from '@testing-library/react'

test('renders without errors', () => {
  render(<AppClass/>)
})

