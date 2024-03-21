const rolesMapping = {
    1: 'Admin',
    2: 'User',
    3: 'Guest',
}

const isPostmanVariable = (token: string): boolean =>
    !!process.env.NODE_ENV && token?.startsWith('{{')

const isEmpty = (data: string | [] | object): boolean => {
    if (!data) return true

    switch (typeof data) {
        case 'string':
            return data.length === 0
        case 'object': {
            return Object.keys(data).length === 0
        }
        case 'number':
            return false
    }
}

const isAdmin = (roleId: number): boolean =>
    rolesMapping[`${roleId}`] === rolesMapping['1']

export { rolesMapping, isPostmanVariable, isEmpty, isAdmin }
