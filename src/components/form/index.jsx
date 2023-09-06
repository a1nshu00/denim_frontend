import { useEffect } from "react";
import { useState } from "react";


export default function Form({ inputs, errors = {}, values = {}, flex, onSubmit }) {

    const formInputs = inputs.map(function (input, i) {
        return FormEngine.FormItem(input, values[input.selector || input.name], errors[input.selector || input.name], i)
    })

    const onFormSubmit = (e) => {
        e.preventDefault();

       
        onSubmit(pluckValues(inputs, e.target.elements))
    }

    return (
        <form onSubmit={(e)=> onFormSubmit(e)}>
            {flex ? <div className="row">{formInputs}</div> : formInputs}
            <button className="btn btn-primary" type="submit">fdgf</button>
        </form>
    )
}

function pluckValues(inputs, formData){
    const selectedValues = {};
    inputs.forEach(input => {
        const type       = input.type;
        const inputName  = input.name;
        const selector   = input.selector || inputName;
        let inputValue   = undefined;

        if (['text', 'number', 'textarea', 'hidden'].includes(type)) {
            inputValue = formData[inputName]?.value;
        } else if (['checkbox', 'switch'].includes(type)) {
            inputValue = formData[inputName]?.checked || false;
        } else if(type == 'tableinput') {
            const tableInputValues = [];
            input.inputs.forEach(input => {
                const inputName  = input.name;
                const selector   = input.selector || inputName;
                const type       = input.type;
                let tableFormElements = formData[inputName]?.length ? formData[inputName] : [];

                const currentFormElements = [];
                tableFormElements.forEach((currentFormElement, index) => {
                    if (currentFormElement?.name == inputName) {
                        currentFormElements.push(currentFormElement)
                    }
                });

                currentFormElements.forEach((currentFormElement, index) => {
                    let inputValue = undefined;

                    if (['text', 'number', 'textarea', 'hidden'].includes(type)) {
                        inputValue = currentFormElement?.value;
                    } else if (['checkbox', 'switch'].includes(type)) {
                        inputValue = currentFormElement?.checked;
                    }

                    tableInputValues[index] = tableInputValues[index] || {};
                    tableInputValues[index][selector] = inputValue;
                })
            })
            inputValue = tableInputValues;
        }
        selectedValues[selector] = inputValue;
    });
    return selectedValues;
}

// {
//     title: "First name",
//     name: "first_name",
//     type:'text',
//     id:"first_name",
//     classes:"first_name",
//     icon : <i className="bx bx-user"></i>,
//     placeholder: "default value",
//     text:"ClickBtn",
//     hint:"This is hint",
//     col:4,
// },

class FormEngine {
    static Icon({icon}){
        return icon ? <span className="input-group-text">{icon}</span> : <></>;
    }

    static Label({title, id}){
        return <label className="form-label" htmlFor={id}>{title}</label>;
    }

    static Hint({hint, error}){
        if (error) return <div className="form-text error-text">{error}</div>;
        if (hint) return <div className="form-text">{hint}</div>;
    
        return <></>;
    }

    static Input({type, name, value, placeholder, id, classes, onClick, text}){
        if (['text', 'number','hidden'].includes(type)) {
            return <input type={type} name={name} className={'form-control ' + (classes||'')} id={id}  placeholder={placeholder} defaultValue={value} />
        }


        if (type == 'textarea') {
            return <textarea name={name} className={'form-control ' + (classes||'')} id={id}  placeholder={placeholder}>{value}</textarea>
        }

        if (['button', 'submit'].includes(type)) {
           return <button type={type} id={id} name={name} className={'btn ' + (classes||'')}  onClick={onClick} >{icon} {text || placeholder || name}</button>
        }

        if (['checkbox', 'switch'].includes(type)) {
            return <input className={'form-check-input ' + (classes||'')} type="checkbox" value={value} name={name} id={id} defaultChecked={!!value ? 'checked':''} />;
        }

        // if (['date', 'month', 'week'].includes(type)) {
        //    return <button type={type} id={id} name={name} className={'btn ' + (classes||'')}  onClick={onClick} >{icon} {text || placeholder || name}</button>
        // }
        
        return <></>;
    }

    static FormItem({ title, name, col, icon, placeholder, type, id, classes, onClick, text, hint, inputs }, value, error, i) {
        const parentClasses = !['checkbox', 'switch'].includes(type) ? 'input-group input-group-merge' : '';
        if (type == 'tableinput') {
            return FormEngine.TableInput({ name, title, col, id, classes, inputs}, value, i);
        }

        if (['button', 'submit'].includes(type)) {
            return <button type={type} id={id} key={i} name={name} className={'btn ' + (classes||'')}  onClick={onClick} >{icon} {text || placeholder || name}</button>
        }

        // if (['checkbox'].includes(type)) {
        //     return (<div className={`form-check mb-3 col-${ col || 12 } `} key={i}>{ FormEngine.Label({ title, id }) }{ FormEngine.Input({ type, name, value, placeholder, id, classes, onClick, text }) }</div>);
        // }

        // if (['switch'].includes(type)) {
        //     return (<div className={`form-check form-switch mb-3 col-${ col || 12 } `} key={i}>{ FormEngine.Label({ title, id }) }{ FormEngine.Input({ type, name, value, placeholder, id, classes, onClick, text }) }</div>);
        // }

        return (
            <div className={`mb-3 col-${ col || 12 }`} key={i}>
                { FormEngine.Label({ title, id }) }
                <div className={parentClasses}>
                    { FormEngine.Icon({ icon }) }
                    { FormEngine.Input({ type, name, value, placeholder, id, classes, onClick, text }) }
                </div>
                { FormEngine.Hint({ hint, error }) }
            </div>
        )
    }


    static TableRow(inputs, values, index, remove) {
        return (<tr key={index}>
            <td>{index+1}</td>
            {inputs.map(
                (input, i) => (
                    <td key={i}>{FormEngine.Input({ ...input, value:values[ input.selector || input.name ] })}</td>
                )
            )}
            <td><button type="button" onClick={() => remove(index)} className="btn btn-sm btn-danger ms-3">x</button></td>
        </tr>)
    }

    static TableInput({ name, title, col, id, inputs = []}, values = [], masterIndex){
        const [tableInputs, setTableInputs] = useState([]);
        const [tableValues, setTableValues] = useState(values);

        useEffect(()=> {
            if (values?.length === 0) addRow();
            else setTableInputs(Array(values?.length).fill(inputs))
        },[]);

        const addRow = () => {
            setTableInputs([...tableInputs, inputs])
        }

        const removeRow = (i) => {
            setTableValues(tableValues.filter((_, index) => index !== i))
            setTableInputs(tableInputs.filter((_, index) => index !== i))
        }

        return (
            <div key={masterIndex} className={`mb-3 col-${ col || 12 }`}>
                <div className="divider divider-dotted">
                    <div className="divider-text">{title}</div>
                </div>

                <button type='button' className={'btn btn-secondary add-more' + id}  onClick={() => addRow()} >Add</button>

                <table className={`mb-3 col-${ col || 12 }`}>
                    <thead><tr><th>{FormEngine.Label({ title:'S.N.' })}</th>{inputs.map(({ title }, i) => (<th key={i}>{FormEngine.Label({ title, id })}</th>))}<th>Remove</th></tr></thead>
                    <tbody>
                        {tableInputs.map((inputs, i) => FormEngine.TableRow(inputs, tableValues[i] ?? {}, i,  removeRow))}
                    </tbody>
                </table>
            </div>
        )
    }
}




 // {
//     title: "Status",
//     name: "status",
//     type:'checkbox',
//     id:"status",
//     classes:"status mb-3",
//     col:4,
// },
// {
//     title: "Description",
//     name: "description",
//     type:'textarea',
//     id:"description",
//     classes:"description",
//     placeholder: "Enter product description",
//     col:4,
// },
// {
//     title: "First name",
//     name: "first_name",
//     type:'switch',
//     id:"first_name",
//     classes:"first_name",
//     icon : <i className="bx bx-user"></i>,
//     placeholder: "default value",
//     text:"ClickBtn",
//     hint:"This is hint",
//     col:4,
// },
// {
//     type:'submit',
//     id:"first_name",
//     classes:"btn-primary",
//     icon : <i className="bx bx-user"></i>,
//     text:"ClickBtn",
//     onClick: () => console.log('called')
// },
