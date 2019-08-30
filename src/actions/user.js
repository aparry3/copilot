export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SING_UP = 'SIGN_UP';

export function signIn(credentials) {
    return {
        type: SIGN_IN,
        credentials
    }
}
export function signOut() {
    return {
        type: SIGN_OUT
    }
}

export function signUp(user_data) {
    return {
        type: SIGN_UP,
        user_data
    }
}
