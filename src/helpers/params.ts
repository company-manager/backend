const queryParams = ['order_by', 'order']

type ClientsOrderParams = 'name' | 'taxpayer_id' | 'city' | 'country'
type UsersOrderParams = 'first_name' | 'last_name' | 'email' | 'created_at'
type OrderParams = 'ASC' | 'DESC'

export interface Params {
    orderby?: UsersOrderParams | ClientsOrderParams
    order?: OrderParams
}

export default queryParams
