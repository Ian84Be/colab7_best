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
    setFormData((prevState) => {
      const newState = { [name]: value }
      if (name === 'food') newState.occasion = null
      if (name === 'occasion') newState.food = null
      return {
        ...prevState,
        ...newState,
      }
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await callback()
  }

  return { formData, handleChange, handleDropdown, handleSubmit }
}
