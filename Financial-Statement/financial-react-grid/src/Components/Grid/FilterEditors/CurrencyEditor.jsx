import React from 'react';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';

  const styles = theme => ({
    root: {
      margin: theme.spacing(1),
    },
    numericInput: {
      fontSize: '14px',
      textAlign: 'right',
      width: '100%',
    },
  });
  
  const CurrencyEditorBase = ({ value, onValueChange, classes }) => {
    const handleChange = (event) => {
      const { value: targetValue } = event.target;
      if (targetValue.trim() === '') {
        onValueChange();
        return;
      }
      onValueChange(parseInt(targetValue, 10));
    };
    return (
      <Input
        type="number"
        classes={{
          input: classes.numericInput,
          root: classes.root,
        }}
        fullWidth
        value={value === undefined ? '' : value}
        inputProps={{
          min: 0,
          placeholder: 'Filter...',
        }}
        onChange={handleChange}
      />
    );
  };
  
  CurrencyEditorBase.propTypes = {
    value: PropTypes.number,
    onValueChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };
  
  CurrencyEditorBase.defaultProps = {
    value: undefined,
  };
  
  const CurrencyEditor = withStyles(styles)(CurrencyEditorBase);
  export default CurrencyEditor;