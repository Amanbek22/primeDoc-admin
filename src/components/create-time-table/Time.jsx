import React, {useState} from 'react'
import css from './create-time.module.css'
import del from '../../img/delete.png'
import Select from 'react-select'

const colourStyles = {
    control: (styles) => ({
        ...styles,
        background: '#F8F8F8',
        width: '120px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '5px 0 0 5px',
        padding: '3px 5px',
        marginTop: '50px',

    }),
    // option: (styles:any) => {
    //     return {...styles,width:'350px'}
    // }
};
const colourStyles2 = {
    control: (styles) => ({
        ...styles,
        background: '#F8F8F8',
        width: '120px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '0 5px 5px 0',
        padding: '3px 5px',
        marginTop: '50px',

    }),
    // option: (styles:any) => {
    //     return {...styles,width:'350px'}
    // }
};

const clocks = [
    {value: '00', label: '00'},
    {value: '01', label: '01'},
    {value: '02', label: '02'},
    {value: '03', label: '03'},
    {value: '04', label: '04'},
    {value: '05', label: '05'},
    {value: '06', label: '06'},
    {value: '07', label: '07'},
    {value: '08', label: '08'},
    {value: '09', label: '09'},
    {value: '10', label: '10'},
    {value: '11', label: '11'},
    {value: '12', label: '12'},
    {value: '13', label: '13'},
    {value: '14', label: '14'},
    {value: '15', label: '15'},
    {value: '16', label: '16'},
    {value: '17', label: '17'},
    {value: '18', label: '18'},
    {value: '19', label: '19'},
    {value: '20', label: '20'},
    {value: '21', label: '21'},
    {value: '22', label: '22'},
    {value: '23', label: '23'},
]
const minutes = [
    {value: '00', label: '00'},
    {value: '05', label: '05'},
    {value: '10', label: '10'},
    {value: '15', label: '15'},
    {value: '20', label: '20'},
    {value: '25', label: '25'},
    {value: '30', label: '30'},
    {value: '35', label: '35'},
    {value: '40', label: '40'},
    {value: '45', label: '45'},
    {value: '50', label: '50'},
    {value: '55', label: '55'},
]
const Time = (props) => {
    const [clock1, setClock1] = useState([...clocks])
    const [clock2, setClock2] = useState([...clocks])
    const ClockChange = (e) => {
        props.setStartH(e.label, props.days, props.index, 'fromH')
        let newArr = clocks.map(item => e.value === item.value ? {
            ...item,
            disabled: true
        } : item)
        setClock2([...newArr])
    }
    return (
        <>
            <div className={css.timeWrapper}>
                <span>
                    <span>От</span>
                    <Select
                        options={clock1}
                        isSearchable={false}
                        placeholder={'Часы'}
                        isOptionDisabled={(option) => option.disabled}
                        styles={colourStyles}
                        value={props.startH ? {value: props.startH, label: props.startH} : null}
                        onChange={ClockChange}
                    />
                    <Select
                        isSearchable={false}
                        options={minutes} placeholder={'Минуты'} styles={colourStyles2}
                        value={props.startM ? {value: props.startM, label: props.startM} : null}
                        onChange={(e) => {
                            props.setStartH(e.label, props.days, props.index, 'fromM')
                        }}
                    />
                </span>

                <span>
                    <span>До</span>
                    <Select
                        options={clock2}
                        placeholder={'Часы'}
                        isSearchable={false}
                        isOptionDisabled={(option) => option.disabled}
                        styles={colourStyles}
                        value={props.endH ? {value: props.endH, label: props.endH} : null}
                        onChange={(e) => {
                            props.setStartH(e.label, props.days, props.index, 'toH')
                            let newArr = clocks.map(item => e.value === item.value ? {
                                ...item,
                                disabled: true
                            } : item)
                            setClock1([...newArr])
                        }}
                    />
                    <Select options={minutes} placeholder={'Минуты'} styles={colourStyles2}
                            value={props.endM ? {value: props.endM, label: props.endM} : null}
                            onChange={(e) => {
                                props.setStartH(e.label, props.days, props.index, 'toM')
                            }}
                            isSearchable={false}
                    />
                </span>
                <img onClick={() => props.removeSchedule(props.days, props.index)} className={css.del} src={del}
                     alt="#"/>
            </div>
        </>
    )
}

export default Time


const colourStyles3 = {
    control: (styles) => ({
        ...styles,
        background: '#00BDD0',
        width: '350px',
        border: '1px solid #00BDD0',
        borderRadius: '5px',
        boxSizing: 'border-box',
        // padding: '3px 5px',
        marginBottom: '20px',
    }),
    singleValue: () => ({
        color: 'white'
    }),
    dropdownIndicator: () => ({
        color: 'white',
        padding: '0 5px 0 5px'
    }),
    placeholder: () => ({
        color: 'white'
    })
    // option: (styles) => {
    //     return {...styles,width:'350px'}
    // }
};
export const Date = (props) => {
    return (
        <div className={css.selectWrapper}>
            <Select isSearchable={false} options={props.options} placeholder={'дни'} value={props.val} onChange={(e) => props.setVal(e)}
                    styles={colourStyles3}/>
        </div>
    )
}