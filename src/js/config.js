// export some config setting
// Path: frontend/src/js/config.js
export const BASE_URL = "http://127.0.0.1:8000"
export const API_URL = BASE_URL + "/api"

export const LOGIN_URL = API_URL + "/user/login";
export const REGISTER_URL = API_URL + "/user/register";
export const LOGOUT_URL = API_URL + "/user/logout";

export const QUERY_LIBRARY_URL = API_URL + "/library"
export const ADD_LIBRARY_URL = API_URL + "/library"
export const PUT_LIBRARY_URL = API_URL + "/library"
export const DELETE_LIBRARY_URL = API_URL + "/library"

export const QUERY_COMMENT_URL = API_URL + "/comment"
export const ADD_COMMENT_URL = API_URL + "/comment"
export const DELETE_COMMENT_URL = API_URL + "/comment"


export const QUERY_PAPER_URL = API_URL + "/paper"
export const QUERY_PDF_URL = API_URL + "/paper"
export const PUT_PDF_URL = API_URL + "/paper"

export const PDF_REQ_URL = API_URL+ "/pdf"