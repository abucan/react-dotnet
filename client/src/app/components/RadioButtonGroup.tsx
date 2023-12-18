import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

interface RadioButtonGroupProps {
  options: any[];
  onChange: (event: any) => void;
  value: string;
}

export default function RadioButtonGroup({
  onChange,
  options,
  value,
}: RadioButtonGroupProps) {
  return (
    <FormControl component='fieldset'>
      <RadioGroup onChange={onChange} value={value}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
