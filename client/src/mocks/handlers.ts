import { rest} from "msw";

const url = "http://localhost:3000";

const get_rooms_correctly = rest.get(url,() => {

})

export const handlers = [get_rooms_correctly]