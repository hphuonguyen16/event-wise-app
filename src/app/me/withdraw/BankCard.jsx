import React from 'react'
import './BankCard.css'

const BankCard = ({ data }) => {
  return (
    <div>
      <div className='card-group'>
        <div className='card'>
          <div className='logo'>
            <img
              src='https://raw.githubusercontent.com/dasShounak/freeUseImages/main/Visa-Logo-PNG-Image.png'
              alt='Visa'
            />
          </div>
          <div className='chip'>
            <img src='https://raw.githubusercontent.com/dasShounak/freeUseImages/main/chip.png' alt='chip' />
          </div>
          <div className='number'>{data.number}</div>
          <div className='name'>{data.owner_name}</div>
          <div className='to'>{data.bank_name}</div>
          <div className='ring'></div>
        </div>
      </div>
    </div>
  )
}

export default BankCard
