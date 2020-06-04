import React, { useState, useEffect } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

export const DatePicker = (props) => {
    const [currentDate, setNewDate] = useState(new Date());
    const today = new Date();
    const onChange = (event, data) => {
      setNewDate(data.value);
      props.action(data.value);
    }

    return <SemanticDatepicker placeholder="Select a date" maxDate={today} selected={currentDate} onChange={onChange} />;
  };



