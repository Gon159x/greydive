import React from 'react'
import Style from './Form.module.css'
import FormCard from '../FormCard/FormCard';

export default function Form({database, readOnly}) {
  return (
    <div className={Style.formulary} >
        <FormCard database={database} readOnly={readOnly}/>
    </div>
  )
}
