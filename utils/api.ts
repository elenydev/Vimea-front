import { DATABASE_URL } from "utils/constants";

export const API_URL = {
    USER: {
        AUTH: {
            SING_IN: `${DATABASE_URL}/user/signIn`,
            SIGN_UP: `${DATABASE_URL}/user/signUp`,
            CHANGE_PASSWORD: `${DATABASE_URL}/user/password/change`,
            REMIND_PASSWORD: `${DATABASE_URL}/user/password/remind`,
            CURRENT: `${DATABASE_URL}/user/getCurrent`
        },
        DETAILS :{
            CHANGE_AVATAR: `${DATABASE_URL}/user/avatar/change`,
            ADD_FAVOURITE_MOVIE: `${DATABASE_URL}/user/favourites/add`,
            REMOVE_FAVOURITE_MOVIE: `${DATABASE_URL}/user/favourites/remove`,
            GET_FAVOURITES: `${DATABASE_URL}/user/favourites/current`
        }
    }
}