import {createClient} from 'contentful'
import env from "react-dotenv";
export const client = createClient({
    space : env.REACT_APP_SPACE,
    accessToken : env.REACT_APP_ACCESS_TOKEN
})
