import React, {useState, useEffect} from 'react';
import MydatePicker from '../components/datePicker';

const DateControl = ({disabled, handleChange, itemEnum, value, renderType}) => {
  const [minDate, setMinDate] = useState(undefined);
  const maxDate = new Date()

  useEffect(() => {
    if (itemEnum == 'H2H_MON_CHILD_IDENTIFICATION_DATE_OF_BIRTH') {
      const minDate = new Date();
      minDate.setDate(minDate.getDate());
      minDate.setFullYear(minDate.getFullYear() - 2);
      minDate.setUTCHours('00');
      minDate.setUTCMinutes('00');
      minDate.setUTCMilliseconds('01');
      setMinDate(minDate);

    }
  }, []);

  return (
    <MydatePicker
      disabled={disabled}
      handleChange={handleChange}
      minDate={minDate}
      selectedValue={value}
      maxDate={maxDate}
      renderType={renderType}
    />
  );
};

export default DateControl;
