import clsx from 'clsx'
import React, {useState} from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import ClearIcon from '@material-ui/icons/Clear';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { normalize, titleCase } from '../util';
import { allMuscles, CATEGORIES } from '../../constants/exercises';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import update from 'immutability-helper';

const styled = withStyles(theme => ({
    exerciseForm: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: theme.text.primary,
        padding: '10px',
        background: theme.palette.background.mediumDark,
        overflow: 'auto'
    },
    formSection: {
        width: '100%',
        boxShadow: `0px 0px 8px -5px ${theme.palette.background.dark}`,
        background: theme.palette.background.light,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '20px',
        padding: '10px'
    },
    formSectionHeader: {
        height: '20px',
        width: '100%',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: 300
    },
    form: {
        width: '100%'
    },
    formSectionInput: {
        color: theme.text.primary,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        width: '100%',
        padding: '5px',
        '&:hover': {
            background: theme.palette.background.main
        },
        '&:focus': {
            background: theme.palette.background.mediumDark
        }
    },
    nameInput: {
        fontSize: '25px',
        fontWeight: 100
    },
    formSectionInputContainer: {
        padding: '5px',
        width: '100%'

    }
}));

const multiSelectStyles = theme => ({
    multiSelectContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    multiSelect: {
        padding: '5px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '100%',
        '&:hover': {
            background: theme.palette.background.main
        }
    },
    multiSelectText: {
        background: 'transparent',
        color: theme.text.primary,
        outline: 'none',
        border: 'none',
        width: '100%',
    },
    multiSelectDropdown: {
        width: '100%',
        maxHeight: '200px',
        overflow: 'auto'
    },
    multiSelectChip: {
        height: '30px',
        width: '100px',
        border: `1px solid ${theme.accents.primary}`,
        borderRadius: '15px',
        margin: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: theme.palette.background.light
    },
    multiSelectList: {
        listStyleType: 'none',
        margin: 0,
        width: '100%',
        height: '100%',
        padding: 0,
    },
    multiSelectTextContainer: {
        flexGrow: 1,
        marginLeft: '5px'
    },
    multiSelectListItem: {
        padding: '10px',
        borderBottom: `1px solid ${theme.palette.background.dark}`,
        background: 'white',
        color: theme.text.dark,
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.background.light
        }
    },
    deleteChip: {
        cursor: 'pointer',
        height: '30px',
        minWidth: '30px',
        width: '30px',
        borderRadius: '15px',
        background: theme.accents.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center'
    },
    multiSelectChipText: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '12px',
        fontWeight: 100,
        padding: '5px 5px 5px 10px',
        whiteSpace: 'nowrap',
        color: theme.text.primary
    },
    deleteIcon: {
        color: theme.text.dark,
        height: '20px',
        width: '20px'
    }
})
let useStyles = makeStyles(multiSelectStyles)

const MultiSelect = (props) => {
    let [selected_elements, setSelectedElements] = useState(props.value ? props.value : [])
    let [mouse_down_element, setMouseDownElement] = useState(null)
    let [focus, setFocus] = useState(false)
    let [filter_text, setFilterText] = useState('')
    let classes = useStyles()
    function selectElement(el) {
        let new_selected_elements = update(selected_elements, {
            $push: [el]
        })
        props.onChange({target:{value:new_selected_elements, name:props.name}})
        setSelectedElements(new_selected_elements)
    }
    function deselectElement(index) {
        let new_selected_elements = update(selected_elements, {
            $splice: [[index, 1]]
        })
        props.onChange({target:{value:new_selected_elements, name:props.name}})
        setSelectedElements(new_selected_elements)
    }
    function endSelect(el) {
        if (el == mouse_down_element) {
            selectElement(el)
        }
        setMouseDownElement(null)
    }
    function beginSelect(e, el) {
        e.preventDefault()
        e.stopPropagation()
        setMouseDownElement(el)
    }
    function handleBlur(e) {
        e.preventDefault()
        e.stopPropagation()
        if (!mouse_down_element) {
            setFocus(false)
        }
    }
    function filteredElements() {
        return props.elements.filter(el => {
            return !selected_elements.includes(el) && el.includes(filter_text)
        })

    }
    return (
        <div className={classes.multiSelectContainer}>
            <div className={classes.multiSelect}>
            {selected_elements.map((element, index) => {
                return (
                    <div className={classes.multiSelectChip}>
                        <div className={classes.multiSelectChipText}><span>{element}</span></div>
                        <div onClick={() => deselectElement(index)} className={classes.deleteChip}><ClearIcon className={classes.deleteIcon} /></div>
                    </div>
                )
            })}
                <div className={classes.multiSelectTextContainer}><input value={filter_text} onChange={(e) => setFilterText(e.target.value)} placeholder='Add primary muslces...' className={classes.multiSelectText} onFocus={() => setFocus(true)}  onBlur={handleBlur}/></div>
            </div>
            {focus && (
                <div className={classes.multiSelectDropdown}>
                    <ul className={classes.multiSelectList}>
                    {filteredElements().map(el => {
                        return (
                            <li className={classes.multiSelectListItem} key={el} onMouseDown={(e) => beginSelect(e, el)} onMouseUp={() => endSelect(el)}>
                                {el}
                            </li>
                        )
                    })}
                    </ul>
                </div>
            )}
        </div>
    )
}

class ExerciseFormView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exercise: props.exercise ? {...props.exercise} : null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }
    componentWillReceiveProps(nextProps) {
        this.setState({exercise: nextProps.exercise})
    }
    handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        console.log(e)
        this.setState({
            exercise: {
                ...this.state.exercise,
                [name]: value
            }
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSave(this.state.exercise)
    }
    handleCancel(e) {
        e.preventDefault()
        this.props.onCancel()
    }
    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.exerciseForm}>
                <form className={classes.form} onSubmit={this.handleSubmit}>
                    <div className={clsx(classes.formSection)}>
                        <div className={classes.formSectionHeader}><span>Name</span></div>
                        <div className={classes.formSectionInputContainer}><input className={clsx(classes.nameInput, classes.formSectionInput)} id="name" name='name' onChange={this.handleChange} value={this.state.exercise.name} /></div>
                    </div>
                    <div className={clsx(classes.formSection)}>
                        <div className={classes.formSectionHeader}><span>Description</span></div>
                        <div className={classes.formSectionInputContainer}><input className={classes.formSectionInput} id='description' name='description' onChange={this.handleChange} value={this.state.exercise.description} /></div>
                    </div>
                    <div className={clsx(classes.formSection)}>
                    <div className={classes.formSectionHeader}><span>Primary muscles</span></div>
                        <MultiSelect name='primary_muscles' onChange={this.handleChange} value={this.state.exercise.primary_muscles} elements={allMuscles()} />
                    </div>
                    <div className={clsx(classes.formSection)}>
                        <div className={classes.formSectionHeader}><span>Secondary muscles</span></div>
                        <Select multiple id="secondary_muscles" name='secondary_muscles' onChange={(e) => {console.log(e); this.handleChange(e)}} value={this.state.exercise.secondary_muscles}>
                            {allMuscles().map(muscle => {
                                return <MenuItem key={`secondary-${muscle}`} value={muscle}>{muscle}</MenuItem>
                            })}
                        </Select>
                    </div>
                    <div className={clsx(classes.formSection)}>
                        <div className={classes.formSectionHeader}><span>Categories</span></div>
                        <Select id="categories"name='categories' onChange={this.handleChange} value={this.state.exercise.categories}>
                            {CATEGORIES.map(muscle => {
                                return <MenuItem key={`secondary-${muscle}`} value={muscle}>{muscle}</MenuItem>
                            })}
                        </Select>
                    </div>
                    <div>
                        <input className="btn btn-primary" type="submit" value="submit" />
                    </div>
                    <div>
                        <button className="btn btn-light" onClick={this.handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}
// <Select multiple id='primary_muscles' name='primary_muscles' onChange={this.handleChange} value={this.state.exercise.primary_muscles}>
//     {allMuscles().map(muscle => {
//         return <MenuItem key={`primary-${muscle}`} value={muscle}>{muscle}</MenuItem>
//     })}
// </Select>

export const ExerciseForm =  styled(ExerciseFormView);
