import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";

interface LocationAutocompleteProps {
  selectedData: any;
  setSelectedData: (data: any) => void;
}
export default function LocationAutocomplete({
  selectedData,
  setSelectedData,
}: LocationAutocompleteProps) {
  // const [value, setValue] = React.useState<any | null>(null);
  const [searchLocation, setSearchLocation] = React.useState("");
  const [locationData, setLocationData] = React.useState([]);
  const defaultProps = {
    options: locationData,
    getOptionLabel: (option: any) => option.formatted || "",
  };

  React.useEffect(() => {
    if (searchLocation) {
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchLocation}&format=json&apiKey=5b64064507eb4d3a994e00b3119124f9`
      )
        .then((response) => response.json())
        .then((result) => {
          setLocationData(result.results);
        })
        .catch((error) => console.log("error", error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchLocation]);

  return (
    <Autocomplete
      {...defaultProps}
      id="controlled-demo"
      onChange={(event, newValue) => {
        if (newValue) {
          const { formatted, lat, lon } = newValue;
          setSelectedData((prev: any) => ({
            ...prev,
            location: {
              formatted: formatted,
              lat: lat,
              lon: lon,
            },
          }));
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location"
          variant="outlined"
          sx={{ width: "90%" }}
          value={searchLocation}
          onChange={(event: any) => {
            setSearchLocation(event.target.value);
          }}
        />
      )}
    />
  );
}

