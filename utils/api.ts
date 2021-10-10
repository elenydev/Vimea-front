import { DATABASE_URL } from "constants/index";

export const API_URL = {
    USER: {
        AUTH: {
            SING_IN: `${DATABASE_URL}/user/post/login`,
            SIGN_UP: `${DATABASE_URL}/user/post/create`,
            CHANGE_PASSWORD: `${DATABASE_URL}/user/put/password`,
            REMIND_PASSWORD: `${DATABASE_URL}/user/put/remindPassword`,
            CURRENT: `${DATABASE_URL}/user/get/currentUser`
        },
        DETAILS :{
            CHANGE_AVATAR: `${DATABASE_URL}/user/put/avatar`,
            ADD_FAVOURITE_MOVIE: `${DATABASE_URL}/user/post/favouriteMovie`,
            REMOVE_FAVOURITE_MOVIE: `${DATABASE_URL}/user/delete/favouriteMovie`,
            GET_FAVOURITES: `${DATABASE_URL}/user/get/favouriteMovies`
        }
    }
}