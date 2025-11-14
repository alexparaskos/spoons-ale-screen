import React from "react";
import { IonItem, IonLabel } from "@ionic/react";
import "./FireTVNativeSelect.css";

interface FireTVNativeSelectProps {
  label: string;
  value: string | string[]; // supports single or multiple
  options: { label: string; value: string }[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
}

/**
 * Fully controlled native <select> with Ionic styling.
 * Works with Fire TV D-Pad, supports single or multiple selection.
 */
const FireTVNativeSelect: React.FC<FireTVNativeSelectProps> = ({
  label,
  value,
  options,
  onChange,
  multiple = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const selectedValues = Array.from(e.target.selectedOptions).map(
        (opt) => opt.value
      );
      onChange(selectedValues);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <IonItem lines="full">
      <IonLabel position="stacked">{label}</IonLabel>
      <select
        multiple={multiple}
        value={value}
        onChange={handleChange}
        className={`firetv-native-select ${multiple ? "multiple" : ""}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </IonItem>
  );
};

export default FireTVNativeSelect;
