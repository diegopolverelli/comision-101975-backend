import {fileURLToPath} from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const generateError=(message, statusCode=400, module= undefined, detail= undefined)=>{
    let error=new Error(message)
    error.statusCode=statusCode
    error.detail=detail
    error.module=module

    return error
}
