import { useCallback, useReducer } from 'react';
//This from Maximilian Schwarzmuller
/*function is a reducer that handles state updates for the form inputs and overall form validity. It listens for specific action types and updates the state accordingly. */
const formReducer = (state, action) => {
  switch (action.type) {
    /*action type is responsible for handling input changes. It iterates through all the inputs, checks their validity, and updates the overall form validity accordingly. It updates the state with the new input value and validity */
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    /* action type is responsible for setting the form data. It updates the state with the provided input data and overall form validity */
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};
/*hook initializes the form state using the useReducer hook. It returns the formState, inputHandler, and setFormData as an array */
export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });
  /* function is a callback that dispatches the 'INPUT_CHANGE' action. It takes the input ID, value, and validity as parameters */
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);
  /*function is a callback that dispatches the 'SET_DATA' action. It takes the input data and form validity as parameters */
  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
