import React, {useState} from 'react'
import clsx from 'clsx'

import DehazeIcon from '@material-ui/icons/Dehaze';
import {makeStyles, withStyles} from '@material-ui/core/styles';


const styles = theme => ({
    programListHeader: {
        width: '100%',
        height: '15%',
        minHeight: '15%',
        padding: '20px 20px 0px 20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: '40px',
        fontWeight: 100,
        textAlign: 'center',
        background: theme.palette.background.light,
        boxShadow: 'black 0px -2px 2px 1px'
    },
    programHeaderStart: {

    },
    programHeaderContentTitle: {
        display: 'flex',
        justifyContent: 'center'
    },
    programHeaderContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        fontSize: '30px',
        fontWeight: 400,
        justifyContent: 'space-between'
    },
    programHeaderAction: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    programHeaderMenuIcon: {
        padding: '10px 20px 10px 0px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerItem: {
        padding: '10px',
        display: 'flex',
        alignItems: 'center'
    },
    hr: {
        width: '100%',
        background: theme.palette.background.dark,
        opacity: 0.1,
        margin: '0',
        border: 0,
        borderTop: '2px solid rgba(0,0,0,.1)'
    },
    tab: {
        padding: '5px 10px 2px 10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        fontSize: '14px',
        cursor: 'pointer',
        color: theme.text.light
    },
    selected: {
        color: theme.text.dark,
        borderBottom: `1px solid ${theme.accents.primary}`
    },
    tabsContainer: {
        display: 'flex'
    }
})

let useStyles = makeStyles(styles)

export const PageHeader = (props) => {
    let classes = useStyles()
    let [selected, setSelected] = useState(0)
    let children = props.children instanceof Array ? props.children : [props.children]

    function select(i, action) {
        setSelected(i)
        action()
    }

    function renderTabs() {
        return (
            <div className={classes.tabsContainer}>
                { props.tabs.map((o, i) => {
                    var style_class = selected == i ? clsx(classes.selected, classes.tab) : classes.tab

                    return (
                        <div className={style_class}>
                            <span className={classes.tabText} onClick={() => select(i, o.action)}>{o.display}</span>
                        </div>
                    )}
                )}
            </div>
        )
    }

    return (
        <div className={classes.programListHeader}>
            <div className={classes.programHeaderContent}>
                <div className={classes.programHeaderContentTitle}>
                { !!props.show_menu && (<div onClick={props.onMenuClick} className={classes.programHeaderMenuIcon}><DehazeIcon /></div>) }
                { props.content }
                </div>
                <div className={classes.programHeaderContentTabs}>
                    {!!props.tabs ? renderTabs() : null}
                </div>
            </div>
            <div className={classes.programHeaderAction}>
                {!!props.action ? props.action : null}
            </div>
        </div>
    )

}
