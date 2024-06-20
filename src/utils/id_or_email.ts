export type OneKeyObject = { 
    [ K: string ] : any 
}

export const IdOrEmail = 
( id:string, email:string, extra?:OneKeyObject  ) => { 
    
    let keys = null
    if( !extra ) 
        return id ? { id: id } : { email: email }

    keys = Object.keys( extra as object )

    return keys.length !== 1 ? 
    { id: null, email: null, ...extra }
    : id ? { id: id, ...extra } : { email: email, ...extra }

}