/* eslint-disable prettier/prettier */
import { numeric } from "vuelidate/lib/validators"

export default value => {
    // eslint-disable-next-line no-unused-vars
    const data = new Date(value)
    return Date.toLocaleString(['en-UK'], {
        month: 'short',
        day: '2-digit',
        year: numeric
    })
}