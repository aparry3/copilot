import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Card, Grid, List, ListItem, ListItemText, Typography, FormControl, Input} from '@material-ui/core'
import {addClientAndPersist} from '../../actions'

function DashboardView(props) {
  return (
    <div>
        {`Welcome ${props.user.name.first}!`}
        <Clients user={props.user} addClient={props.addClient}/>
        <Programs />
    </div>
  );
}

export const Dashboard = connect(

    state => {
        return {user: state.auth.user}
    },
    dispatch => {
        return {
            addClient: (id, name, email) => dispatch(addClientAndPersist(id, name, email))
        }
    }
)(DashboardView)


function Clients(props) {
    let clients = !!props.user.clients ? props.user.clients : []
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');

    function handleSubmit(e) {
        e.preventDefault()
        props.addClient(props.user.id, name, email);
    }


    return (

        <Grid>
            <Card>
                <Typography variant="h5">Clients</Typography>
                <List>
                    {clients.map(client => {
                        return (
                            <ListItem key={client.name}>
                                <ListItemText primary={client.name} secondary={client.email} />
                            </ListItem>
                        )
                    })}
                    <ListItem>
                        <form onSubmit={handleSubmit}>
                            <FormControl>
                                <Input id="client-name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                            </FormControl>
                            <FormControl>
                                <Input id="client-email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                            </FormControl>
                            <input className="btn btn-primary" type="submit" value="submit" />

                        </form>
                    </ListItem>
                </List>
            </Card>
        </Grid>
    )
}

function Programs(props) {
    return <div />
}
