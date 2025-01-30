import React from "react";
import Select from "react-select";
const ReactSearchableDropdown = ({options, handleChange, selectedOption}) => {
  return (
    <div>
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    </div>
  );
};

export default ReactSearchableDropdown;
