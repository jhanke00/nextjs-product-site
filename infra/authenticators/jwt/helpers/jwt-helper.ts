import {sign, verify} from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET as string;
export default class JwtHelper {
  async encode(payload: string){
    return sign(payload, JWT_SECRET);
  }
}