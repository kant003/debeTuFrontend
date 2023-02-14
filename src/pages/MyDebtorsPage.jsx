import { useEffect, useState } from "react";
import Debts from "../components/Debts";
import DebtForm from "../components/DebtForm";

const MyDebtors = () => {
    const [debtors, setDebtors] = useState([])


    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchingDebtors = async () => {
          const request = await fetch('http://localhost:3000/connection/getMyDebtors',
          {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + token,
            }
          })
          const arrayDeConexiones = await request.json()
          setDebtors(arrayDeConexiones)
        }
    
        fetchingDebtors()
      }, [])

    async function handleRemoveDebt(idConnection, idDebt){
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
      //TODO refrescar la lista
      const newDebtors = [...debtors]
      console.log(newDebtors)

      const debtorToRemoveDebt = newDebtors.find(e=>e._id === idConnection)
     console.log(debtorToRemoveDebt)
     debtorToRemoveDebt.debts = debtorToRemoveDebt.debts.filter(e=>e._id !== idDebt)
      setDebtors(newDebtors)
    }

    function handleAddDebt(event, idConnection, debtData){

    }

    return <>
        <h1>Listado de mis deudores</h1>
        <ul>
        {debtors.map((debtor) => (
          <li key={debtor._id}>
            <h2>
              Deudor: {debtor.debtor.name} ({debtor.debtor.email})
            </h2>
            <Debts 
              handleRemove={(idDebt)=>handleRemoveDebt(debtor._id,idDebt)} 
              debts={debtor.debts}/>

            <DebtForm idConnection={debtor._id}/>
          </li>
        ))}
      </ul>
    </>
}

export default MyDebtors