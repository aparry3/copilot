import {API_URI} from '../config'
import {dispatched, makeRequest} from './utils'

export const actions = {
    ADD_PROGRAM: 'ADD_PROGRAM',
    DELETE_PROGRAM: 'DELETE_PROGRAM',
    RECIEVE_EXPORT: 'RECIEVE_EXPORT',
    RECIEVE_PROGRAM: 'RECIEVE_PROGRAM',
    RECIEVE_PROGRAMS: 'RECIEVE_PROGRAMS',
    SET_ACTIVE_PROGRAM: 'SELECT_ACTIVE_PROGRAM',
}


function _getUrl(program_id, extension = null) {
    return !!program_id && !!extension ?
        `${API_URI}/programs/${program_id}/${extension}` : !!program_id ?
        `${API_URI}/programs/${program_id}` :
        `${API_URI}/programs`
}


function _addProgram(res) {
    return {
        type: actions.ADD_PROGRAM,
        program: res.program
    }
}

function _deleteProgram(res) {
    return {
        type: actions.DELETE_PROGRAM,
        program_id: res.program,
        weeks: res.weeks
    }
}

function _recieveExport(res) {
    let link = document.createElement('a');
    link.href = res.export.url;
    link.download = 'program.pdf';
    link.click();

    return {
        type: actions.RECIEVE_EXPORT,
        export: res.export
    }
}


function _recieveProgram(res) {
    return {
        type: actions.RECIEVE_PROGRAM,
        program: res.program
    }
}

function _recievePrograms(res) {
    return {
        type: actions.RECIEVE_PROGRAMS,
        programs: res.programs
    }
}

export function setActiveProgram(program_id) {
    return {
        type: actions.SET_ACTIVE_PROGRAM,
        id: program_id
    }
}

const programs = {
    add: (name, length) => dispatched(_addProgram, makeRequest(_getUrl(), 'POST', {name, length})),
    delete: (program_id) => dispatched(_deleteProgram, makeRequest(_getUrl(program_id), 'DELETE')),
    export: (program_id) => dispatched(_recieveExport, makeRequest(_getUrl(program_id, 'export'), 'GET')),
    query: () => dispatched(_recievePrograms, makeRequest(_getUrl(), 'GET')),
    get: (program_id) => dispatched(_recieveProgram, makeRequest(_getUrl(program_id), 'GET')),
    save: (program) => dispatched(_recieveProgram, makeRequest(_getUrl(program._id), 'PUT', program))
}

export const addProgram = programs.add
export const deleteProgram = programs.delete
export const exportProgram = programs.export
export const getProgram = programs.get
export const getPrograms = programs.query
export const saveProgram = programs.save
