const Debts = ({debts, idConnection}) => {

    async function handleRemove(idDebt){
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/connection/removeDebt/${idConnection}/${idDebt}`,
        {
          method:'DELETE',
          headers: {
            'Content-Type':'application/json',
            "Authorization": "bearer " + token,
          },
        })
        const data = await response.json()
        console.log(data)
    }

    const sum = debts.filter(d=>!d.isPaid).reduce((acc, d) => acc+d.amount , 0)
    
    if(!debts.length) return 'No hay deudas'

    
    return <>
        {debts.length}
        <ul>
            {
            debts.map(debt =>{
                return <li key={debt._id}> 
                    {debt._id} {debt.concept} {debt.amount} 
                    <button onClick={()=>handleRemove(debt._id)}  className="m-2 p-0 ">X</button>
                </li>
            })
            }
        </ul>
        <div>TOTAL: {sum} </div>
    </>
}

export default Debts