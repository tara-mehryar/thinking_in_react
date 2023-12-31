import './InvoiceTable.css';
import formatCurrency from '../utils/formatCurrency';
import idGenerator from '../utils/idGenerator';
import { useState } from 'react';
import axios from 'axios';

const EditableRowModeButtons = ({ isEditing,onEditClick,onSaveClick, onDeleteClick }) => {
    return isEditing ? (
        <td>
            <button onClick={onSaveClick}>Save</button>
        </td>
    ) : (
        <td>
            <button onClick={onDeleteClick}>Delete</button>
            <button onClick={onEditClick}>Edit</button>
        </td>
    )
}

const EditableDescriptionCell = ({ value, isEditing,onValueChange }) => {
    return isEditing ? (
        <td>
            <input 
                type='text' 
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
            />
        </td>
    ) : (
        <ts>{value}</ts>
    )
}

const EditableRateCell = ({ value, isEditing, onValueChange }) => {
    return isEditing ? (
        <td>
            $<input 
                type='text' 
                value ={value}
                onChange={(e) => onValueChange(e.target.value)}
            />
            /hr
        </td>
    ) : (
        <td>{formatCurrency(value)}</td>
    )
}

const EditableHoursCell = ({ value, isEditing, onValueChange }) => {
    return isEditing ? (
        <td>
            <input 
                type="text" 
                value={value} 
                onChange={(e) => onValueChange(e.target.value)}
            />
        </td>
    ) : (
        <td>{value}</td>
    )
}

const InvoiceTableHeader = () => {
    return (
        <tr>
            <th></th>
            <th>Description</th>
            <th>Rate</th>
            <th>Hours</th>
            <th>Amount</th>
        </tr>
    )
}

const InvoiceTableAddButton = ({ onClick }) => {
    return (
        <tr>
            <td></td>
            <td colSpan='4'>
                <button onClick={onClick}>Add</button>
            </td>
        </tr>
    )
}

const InvoiceTableRow = ({ initialInvoiceData, initialIsEditing, onDeleteRow }) => {
    // const { description, rate, hours} = initialInvoiceData;
    const [isEditing, setIsEditing] = useState(initialIsEditing)

    const [description, setDescription] = useState(initialInvoiceData.description)
    const [rate, setRate] = useState(initialInvoiceData.rate)
    const [hours, setHours] = useState(initialInvoiceData.hours)

    const setEditMode = () => setIsEditing(true)
    const setNormalMode = async () => {
        const { data } = await axios.post(`/api/invoice/${initialInvoiceData.id}/edit`, (req, res) => {
            description,
            rate,
            hours
        })

        setDescription(data.description)
        setRate(data.rate)
        setHours(data.hours)
        
        setIsEditing(false)
    }

    return (
        <tr>
            <EditableRowModeButtons 
                isEditing={isEditing}
                onEditClick={setEditMode}
                onSaveClick={setNormalMode}
                onDeleteClick={onDeleteRow}
            />
            <EditableDescriptionCell 
                value={description} 
                isEditing={isEditing}
                onValueChange={setDescription}
            />
            <EditableRateCell 
                value={rate} 
                isEditing={isEditing}
                onValueChange={setRate}
            />
            <EditableHoursCell 
                value={hours} 
                isEditing={isEditing}
                onValueChange={setHours}
            />
            <td>{formatCurrency(rate * hours)}</td>
        </tr>
    )
}

const InvoiceTable = ({ initialInvoiceList }) => {
    const [invoiceList, setInvoiceList] = useState(initialInvoiceList)
    const getId = idGenerator(invoiceList.length)

    const addInvoiceRow = async () => {
        const { data } = await axios.post('/api/invoice', {
            description: "Description",
            rate: 0,
            hours: 0
        })
        data[data.length - 1].isEditing = true
        // const newInvoiceList = [...invoiceList];
        // newInvoiceList.push({
        //     id: getId.next().value,
        //     description: 'Description',
        //     rate: '',
        //     hours: '',
        //     isEditing: true,
        // });
        setInvoiceList(data)
    }

    const deleteInvoiceRow = async (id) => {
        // const newInvoiceList =[...invoiceList];
        // const index = newInvoiceList.findIndex((invoice) => invoice.id === id);
        // newInvoiceList.splice(index, 1);
        let { data } = await axios.post(`/api/invoice/${id}/delete`)
        setInvoiceList(data);
    };

    const rows = invoiceList.map(({ id, description, rate, hours, isEditing }) => {
        return(
            <InvoiceTableRow
                key={id}
                initialInvoiceData={{ description,rate,hours,id }}
                initialIsEditing={isEditing}
                onDeleteRow={() => deleteInvoiceRow(id)}
            />
        )
    })

    return (
        <table>
            <thead>
                <InvoiceTableHeader/>
            </thead>
            <tbody>
                {rows}
                {/* <tr>
                    <EditableRowModeButtons isEditing={false}/>
                    <EditableDescriptionCell value='Web Development' isEditing={false}/>
                    <EditableRateCell value={25} isEditing={false}/>
                    <EditableHoursCell value={10} isEditing={false}/>
                </tr>
                <tr>
                    <EditableRowModeButtons isEditing={true}/>
                    <EditableDescriptionCell value='Copywriting' isEditing={true}/>
                    <EditableRateCell value={20} isEditing={true}/>
                    <EditableHoursCell value={8} isEditing={true}/>
                </tr> */}
            </tbody>
            <tfoot>
                <InvoiceTableAddButton onClick={addInvoiceRow}/>
            </tfoot>
        </table>
    )
}

export default InvoiceTable;
