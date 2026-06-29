
import { useState } from "react";
import "../style/validated-input.css";

interface ValidatedInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage: string;
  type?: string;
  textarea?: boolean;
}

function ValidatedInput({
  label,
  value,
  onChange,
  errorMessage,
  type = "text",
  textarea = false,
}: ValidatedInputProps) {
  const [focused, setFocused] =
    useState(false);

  const isEmpty =
    value.trim() === "";

  const showError =
    focused && isEmpty;

  const showSuccess =
    focused && !isEmpty;

  const inputClassName =
    `form-control frutiger-input ${
      showError
        ? "validated-input-error"
        : showSuccess
          ? "validated-input-success"
          : ""
    }`;

  return (
    <div className="mb-3">
      <label className="form-label frutiger-label">
        {label}
      </label>

      {
        textarea ? (
          <textarea
            className={inputClassName}
            value={value}
            onChange={(e) =>
              onChange(e.target.value)
            }
            onFocus={() =>
              setFocused(true)
            }
            onBlur={() =>
              setFocused(false)
            }
          />
        ) : (
          <input
            type={type}
            className={inputClassName}
            value={value}
            onChange={(e) =>
              onChange(e.target.value)
            }
            onFocus={() =>
              setFocused(true)
            }
            onBlur={() =>
              setFocused(false)
            }
          />
        )
      }

      {
        showError && (
          <div className="validated-input-message">
            {errorMessage}
          </div>
        )
      }
    </div>
  );
}

export default ValidatedInput;