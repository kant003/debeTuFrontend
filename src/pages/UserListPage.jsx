import { useEffect } from "react"
import { useState } from "react"

const UserList = () => {
    const [users, setUsers] = useState([])
    const [loading ,setLoading] = useState(false)

    useEffect(()=>{
        async function callApi(){
            setLoading(true)
            console.log('llamando')
            console.log(import.meta.env.backend)
            const request = await fetch(import.meta.env.backend+'/user/')
            const json = await request.json()
            setUsers(json)
            setLoading(false)
        }
        callApi()
    },[])

    if(loading) return <div>Loading...</div>
    if(!users.length) return <div>'No hay usuarios'</div>

    return <>
        <h1>Lista usuarios  ({users.length})</h1>
        {users.map(user => 
            <div key={user._id}>{user.email}</div>
        )}
    </>
}

export default UserList
