import React, {useState} from 'react';
import { connect } from 'react-redux';
import {addProgramAndPersist, getProgram} from '../../actions';
import { Link } from "react-router-dom";
import {history} from '../../util'
import {InputLabel, Input, List, ListItem, ListItemText, FormControl, Card, Select, MenuItem, Typography} from '@material-ui/core'


export function ProgramsListView(props) {
    let {programs} = props
    console.log(props)
    let [client_index, setClientIndex] = useState(-1);
    let [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.addProgram(props.user._id, name, props.clients[client_index]);
    }
    function handleSelect(program) {
        props.getProgram(props.user._id, program._id)
        console.log(props.match)
        history.push(`${props.location.pathname}/${program._id}`)
    }
    return (
        <Card>
            <List>
                <ListItem button>
                    <form onSubmit={handleSubmit}>
                        <FormControl >
                            <InputLabel htmlFor="program_name">Name</InputLabel>
                            <Input id="program_name"name='program_name' onChange={(e) => setName(e.target.value)} placeholder="Name Program" value={name} />
                        </FormControl>

                        <FormControl >
                            <InputLabel htmlFor="client_index">Client</InputLabel>
                            <Select id="client_index"name='client_index' onChange={(e) => setClientIndex(e.target.value)} value={client_index}>
                                {props.clients.map((client, index)=> {
                                    return <MenuItem key={`${index}_`} value={index}>{`${client.name}`}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <input className="btn btn-primary" type="submit" value="Save" />

                    </form>
                </ListItem>
                {programs.length > 0 && programs.map(program => {
                    return (
                        <ListItem button onClick={() => handleSelect(program)}>
                            <ListItemText primary={<Typography>{`${program.client_name} - ${program.name}`}</Typography>} secondary={`${program.client_email}`} />
                        </ListItem>
                    )
                })}
            </List>
        </Card>
    )
}
export const ProgramsList = connect(
    (state, ownProps) => {
        console.log(ownProps)
        return {
            programs: state.programs.all_programs,
            clients: state.auth.user.clients,
            user: state.auth.user
        }
    },
    dispatch => {
        return {
            addProgram: (id, name, client) => dispatch(addProgramAndPersist(id, name, client)),
            getProgram: (user_id, program_id) => dispatch(getProgram(user_id, program_id))
        }
    }
)(ProgramsListView)
