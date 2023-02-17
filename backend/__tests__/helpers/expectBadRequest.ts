function expectBadRequest(status: number): void {
  expect(status).toBe(400)
}

export default expectBadRequest
