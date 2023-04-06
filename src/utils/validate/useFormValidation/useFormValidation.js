import {useState} from 'react'
//пишем свой хук для валидации
export function useFormValidation(initialValues={}) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)

  const handleChange = (e) => {
    const{ name, value, validationMessage, form} = e.target
    setValues((oldValues) => ({...oldValues, [name]: value}))
    setErrors((oldErrors) => ({oldErrors, [name]: validationMessage}))
    setIsValid(form.checkValidity())
  }

  return(values, errors, isValid, handleChange)
}