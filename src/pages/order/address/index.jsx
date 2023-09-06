import Box from "@mui/material/Box"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';


export default function AddressBox( {isViewMode = false}) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }} className="mt-5 mb-0">
            <Box sx={{ width: '50%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }} className='mb-1 pe-5'>
                    <Typography variant="subtitle2">Delivery Address</Typography>
                    {isViewMode !== true && <Button startIcon={<EditIcon fontSize="small" />}></Button>}
                </Box>
                <table className="col-12" style={{ height: 120 }}>
                    <tbody>
                        <tr>
                            <td><Typography variant="body2">Address</Typography></td>
                            <td><Typography variant="subtitle2">:</Typography></td>
                            <td><Typography variant="subtitle2">this is addressfsdfghdfmdsf</Typography></td>
                        </tr>
                        <tr>
                            <td><Typography variant="body2">Pincode</Typography></td>
                            <td><Typography variant="subtitle2">:</Typography></td>
                            <td><Typography variant="subtitle2">331304</Typography></td>
                        </tr>
                        <tr>
                            <td><Typography variant="body2">Phone</Typography></td>
                            <td><Typography variant="subtitle2">:</Typography></td>
                            <td><Typography variant="subtitle2">7426808721</Typography></td>
                        </tr>
                    </tbody>
                </table>
            </Box>
            <Box sx={{ width: '50%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }} className='mb-1 pe-5'>
                    <Typography variant="subtitle2">Billing Address</Typography>
                    {isViewMode !== true  && <Button startIcon={<EditIcon fontSize="small" />}></Button>}
                </Box>
                <table className="col-12" style={{ height: 120 }}>
                    <tbody>
                        <tr>
                            <td><Typography variant="body2">Address</Typography></td>
                            <td><Typography variant="subtitle2">:</Typography></td>
                            <td><Typography variant="subtitle2">this is addressfsdfghdfmdsf</Typography></td>
                        </tr>
                        <tr>
                            <td><Typography variant="body2">Pincode</Typography></td>
                            <td><Typography variant="subtitle2">:</Typography></td>
                            <td><Typography variant="subtitle2">331304</Typography></td>
                        </tr>
                        <tr>
                            <td><Typography variant="body2">Phone</Typography></td>
                            <td><Typography variant="subtitle2">:</Typography></td>
                            <td><Typography variant="subtitle2">7426808721</Typography></td>
                        </tr>
                    </tbody>
                </table>
            </Box>
        </Box>);

}