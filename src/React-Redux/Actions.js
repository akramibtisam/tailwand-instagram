const Add__User=({username,img,id})=>({
    type:'ADDUSER',
    new_user:{
        username,
        img,
        id
    }
})
const RemoveUser=()=>({
    type:'REMOVEUSER',
})

const ClickModal=(setting)=>({
    type:'CLICK',
    set:setting
})
export {Add__User,RemoveUser,ClickModal}