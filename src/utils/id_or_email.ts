
export type OneKeyObject = { 
    [ K: string ] : any 
}

export const IdOrEmail = 
( id:string, email:string, extra?:OneKeyObject  ) => { 
    const keys = Object.keys( extra )
    // ..Silent is gold..
    return keys.length !== 1 ? {id: null, email: null, ...extra}
    : id ? { id: id, ...extra } : { email: email, ...extra }
}
