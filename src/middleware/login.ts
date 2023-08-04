import { verify } from "jsonwebtoken";
import { config } from 'dotenv';

config();

const login = (req: any, res: any, next: any) => {
    try {
        const decode = verify(req.headers.authorization, process.env.SECRET as string);
        req.user = decode;
        next();
    } catch(error) {
        return res.status(401).json({message: 'Usuário não autenticado'});
    }
}

export { login }