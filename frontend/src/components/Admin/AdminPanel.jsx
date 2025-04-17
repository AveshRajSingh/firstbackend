import React from 'react'
import AllProduct from './AllAdminProduct.jsx'
import CreateNewProducts from './CreateNewProducts.jsx'

const AdminPanel = () => {
    const [show,setShow] = React.useState(false);
    const onClick = (e) => {
        setShow(!show)
    }
  return (
    <div>
      {show ? <AllProduct /> : <CreateNewProducts />}
      <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Toggle</button>
    </div>
  )
}

export default AdminPanel
