import './InvoiceTable.css';
import formatCurrency from '../utils/formatCurrency';
import idGenerator from '../utils/idGenerator';

const EditableRowModeButtons = ({ isEditing }) => {
    return isEditing ? (
        <td>
            <button>Save</button>
        </td>
    ) : (
        <td>
            <button>Delete</button>
            <button>Edit</button>
        </td>
    )
}

const EditableDescriptionCell = ({ value, isEditing }) => {
    return isEditing ? (
        <td>
            <input type='text' value={value}/>
        </td>
    ) : (
        <ts>{value}</ts>
    )
}

const EditableRateCell = ({ value, isEditing }) => {
    return isEditing ? (
        <td>
            $<input type='text' value ={value}/>
            /hr
        </td>
    ) : (
        <td>{formatCurrency(value)}</td>
    )
}

const EditableHoursCell = ({ value, isEditing }) => {
    return isEditing ? (
        <td>
            <input type="text" value={value} />
        </td>
    ) : (
        <td>{value}</td>
    )
}

const InvoiceTable = () => {
    return (
        <table>
            <tbody>
                <tr>
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
                </tr>
            </tbody>
        </table>
    )
}

export default InvoiceTable;
