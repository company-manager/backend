const isPostmanVariable = (token: string): boolean =>
  process.env.NODE_ENV !== 'production' && token?.startsWith('{{')

export { isPostmanVariable }
