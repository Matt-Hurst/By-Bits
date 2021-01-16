import React from 'react'

import './Policy.scss'

const Policy = ({userPolicy}) => {

  const { policy, vehicle } = userPolicy

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className="policy-page-grand-wrapper">
      <h1>
        My Policy
      </h1>
      <h3>Policy reference</h3>
      <p>{policy.policy_ref}</p>
      <h3>Cover type</h3>
      <p>{policy.cover}</p>
      <h3>Car</h3>
      <p>{capitalize(vehicle.make)} {capitalize(vehicle.model)} {capitalize(vehicle.colour)} -{vehicle.reg}</p>
      <h3>Address</h3>
      <p>{`${policy.address.line_1}, ${policy.address.line_2}, ${policy.address.postcode}`}</p>
    </div>
  )
}

export default Policy