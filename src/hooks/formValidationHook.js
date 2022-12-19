import { useState } from "react";

const useInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = props(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueInputHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const BlurHandler = (event) => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueInputHandler,
    BlurHandler,
    reset,
  };
};
export default useInput;
