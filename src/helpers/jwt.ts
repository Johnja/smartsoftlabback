import jwt from 'jsonwebtoken';

export const createJWT = (uid: any) => {

    
    return new Promise( (resolve, reject ) => {

        const payload = {

            uid
    
        };
    
        jwt.sign( payload, process.env.JWT_SECRET || '', {
            expiresIn: '12h'
        }, (error, token) => {
            if(error){
                console.log(error);
                reject('No se pudo generar el JWT')

            }else{
                resolve ( token );
            }
        });

    });
    
}

