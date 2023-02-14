const Debts = ({debts, handleRemove}) => {
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