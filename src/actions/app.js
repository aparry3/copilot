export const SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE'

export function setActivePage(page, page_state=null) {
    return {
        type: SET_ACTIVE_PAGE,
        page,
        page_state
    }
}
