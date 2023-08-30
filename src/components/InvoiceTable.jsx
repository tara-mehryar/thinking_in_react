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

const InvoiceTableAddButton = () => {
    return (
        <tr>
            <td></td>
            <td colSpan='4'>
                <button>Add</button>
            </td>
        </tr>
    )
}

const InvoiceTableRow = ({ initialInvoiceData, initialIsEditing }) => {
    const { description, rate, hours} = initialInvoiceData;

    return (
        <tr>
            <EditableRowModeButtons isEditing={initialIsEditing}/>
            <EditableDescriptionCell value={description} isEditing={initialIsEditing}/>
            <EditableRateCell value={rate} isEditing={initialIsEditing}/>
            <EditableHoursCell value={hours} isEditing={initialIsEditing}/>
            <td>{formatCurrency(rate * hours)}</td>
        </tr>
    )
}

const InvoiceTable = ({ initialInvoiceList }) => {
    const rows = initialInvoiceList.map(({ id, description, rate, hours }) => {
        return(
            <InvoiceTableRow
                key={id}
                initialInvoiceData={{ description,rate,hours }}
                initialIsEditing={false}
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
                <InvoiceTableAddButton/>
            </tfoot>
        </table>
    )
}

export default InvoiceTable;
