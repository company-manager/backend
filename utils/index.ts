const isPostmanVariable = (token: string): boolean =>
    !!process.env.NODE_ENV && token?.startsWith('{{')

export { isPostmanVariable }
