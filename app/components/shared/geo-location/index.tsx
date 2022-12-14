/* eslint-disable react/jsx-key */

import PlacesAutocomplete from "react-places-autocomplete";
import { Form, Input } from "antd";

interface GeoLocationTypes {
  selectedLocation: string;
  handleChange: (address: string) => void;
  handleSelect: (address: string) => void;
  title: string;
  required: boolean;
  name: string;
}
function GeoLocation({
  selectedLocation,
  handleChange,
  handleSelect,
  title,
  required,
  name,
}: GeoLocationTypes) {
  console.log(selectedLocation);
  return (
    <PlacesAutocomplete
      value={selectedLocation}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <Form.Item
            name={name}
            label={title ? title : "Location"}
            rules={[
              {
                required: required,
                message: "Please enter the Location ...!",
              },
            ]}
          >
            <Input {...getInputProps({})} />
          </Form.Item>

          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default GeoLocation;
