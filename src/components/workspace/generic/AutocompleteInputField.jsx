import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import useOutsideHandler from '../../../hooks/useOutsideClickHandler';
import { sanitizeIdentificator } from '../../../utils/workspaceValidations';

AutocompleteInputField.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string),
  duplicates: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  mustSelect: PropTypes.bool,
};

export default function AutocompleteInputField({
  suggestions,
  duplicates,
  onSubmit,
  disabled,
  mustSelect = false,
}) {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const autocompleteRef = useRef(null);

  useOutsideHandler(autocompleteRef, () => setShow(false));
  // useDefferedValue for onChange of the input
  return (
    <div className="autocomplete" ref={autocompleteRef}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onClick={() => setShow(!show)}
        disabled={disabled}
      />
      {show && !!suggestions.length && (
        <div
          className="dropdown suggestions"
          onClick={(e) => e.preventDefault()}
          style={{
            width: autocompleteRef?.current?.clientWidth - 30 ?? '80%',
          }}
        >
          {suggestions
            .filter(
              (sug) =>
                sug.toLowerCase().startsWith(inputValue.toLowerCase()) &&
                !duplicates.includes(sug)
            )
            .map((sug, i) => (
              <div
                className="suggestion"
                key={i}
                onClick={() => {
                  setInputValue(sug);
                  setShow(false);
                }}
              >
                {sug}
              </div>
            ))}
        </div>
      )}
      <button
        onClick={() => {
          onSubmit(sanitizeIdentificator(inputValue));
          setShow(false);
          setInputValue('');
        }}
        className="btn action-btn"
        disabled={
          disabled ||
          sanitizeIdentificator(inputValue) === '' ||
          (mustSelect &&
            !suggestions.includes(sanitizeIdentificator(inputValue)))
        }
      >
        Add
      </button>
    </div>
  );
}
