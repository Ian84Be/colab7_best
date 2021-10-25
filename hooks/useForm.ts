import { useState } from 'react'

export const useForm = (callback: any, initialState = {}) => {
  const [formData, setFormData] = useState(initialState)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleDropdown = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    { name, value }
  ) => {
    console.log('handle dropdown', name, value)
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await callback()
  }

  return { formData, handleChange, handleDropdown, handleSubmit }
}
