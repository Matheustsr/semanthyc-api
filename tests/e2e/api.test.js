import {
  jest,
  expect,
  test,
  describe,
} from '@jest/globals'

import superTest from 'supertest'
import Server from '../../src/app.js'

describe('SEMANTHYC-API E2E Test Suite', () => {
  test('GET /health-check  - should return an string', async () => {
    const response = await superTest(Server)
      .get('/health-check')

	  const data = JSON.parse(response.text)
	  expect(data)
    expect(data.length).toEqual(0)
  })
})
