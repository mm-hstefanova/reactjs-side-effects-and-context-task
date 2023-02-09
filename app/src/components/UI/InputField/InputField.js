import classes from './InputField.module.css';

function InputField(props) {
  return (
    <div
      className={`${classes.control} ${props.isValid ? classes.invalid : ''}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        type={props.type}
      />
    </div>
  );
}

export default InputField;
