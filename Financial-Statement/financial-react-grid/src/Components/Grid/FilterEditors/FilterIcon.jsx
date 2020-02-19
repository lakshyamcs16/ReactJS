import React from 'react';
import DateRange from '@material-ui/icons/DateRange';
import {
     TableFilterRow,
  } from '@devexpress/dx-react-grid-material-ui';

  const FilterIcon = ({ type, ...restProps }) => {
    if (type === 'month') return <DateRange {...restProps} />;
    return <TableFilterRow.Icon type={type} {...restProps} />;
  };

  export default FilterIcon;