import React, {
  FC,
  ReactElement,
  useEffect,
  useState
} from 'react'
import TextField from '@material-ui/core/TextField'
import PhoneInput from 'react-phone-input-2'

import 'react-phone-input-2/lib/material.css'
import './inputEdit.scss'

interface InputEditProps {
  data: string;
  name: string
  label: string;
  handleDisabled: (e: boolean) => void;
  handleOnBlur: ({}) => void;
}

export const InputEdit: FC<InputEditProps> = ({data, name, handleOnBlur, handleDisabled, label }: InputEditProps): ReactElement => {
  const [value, setValue] = useState('');

  const handleChange = (e: any) => {
    if (name === "phone" && e.length > 5) {
      handleDisabled(false)
    } else {
      handleDisabled(true)
    }
    setValue(e)
  }

  useEffect(() => {
    setValue(data)
  }, [data])

  if (name === "phone") {
    return (
      <PhoneInput
        enableAreaCodes={true}
        enableSearch={true}
        country={'ua'}
        value={value}
        onChange={(phone) => handleChange(phone)}
        onBlur={() => handleOnBlur({[name]: value})}
      />
    )
  }

  return (
      <TextField
        id="edit_input_string"
        style={{ borderColor: 'white', width: '100%' }}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => handleOnBlur({[name]: value})}
        label={label}
      />
  );
};