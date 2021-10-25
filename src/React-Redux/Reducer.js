const UserReducer=(state=[],action)=>{
    switch(action.type)
    {
        case 'ADDUSER':
            return [
                ...state,
                action.new_user
            ]
        case 'REMOVEUSER':
            return state=[]
        default:
            return state
    }
}
export const ModalReducer=(state={open:false},action)=>{
    switch(action.type){
        default:
            return state
        case 'CLICK':
            return {
                open:action.set
            }
    }

}
export default UserReducer
