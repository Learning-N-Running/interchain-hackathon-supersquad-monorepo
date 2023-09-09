import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { depositAmountState } from "./lib/states";

const DepositSlider: React.FC = () => {
  const [deposit, setDeposit] = useRecoilState(depositAmountState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeposit(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <input
        type="range"
        min="0"
        max="200"
        value={deposit}
        onChange={handleChange}
        color="purple"
      />
    </div>
  );
};

export default DepositSlider;

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
// import Slider from "@mui/material/Slider";

// export default function DepositSlider() {
//   const [value, setValue] = React.useState<number>(30);

//   const handleChange = (event: Event, newValue: number | number[]) => {
//     setValue(newValue as number);
//   };

//   return (
//     <Box sx={{ width: 200 }}>
//       <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
//         <Slider aria-label="Volume" value={value} onChange={handleChange} />
//       </Stack>
//       <Slider disabled defaultValue={30} aria-label="Disabled slider" />
//     </Box>
//   );
// }

// import { atom, useRecoilState } from "recoil";
// import { depositAmountState } from "./lib/states";
// import Box from "@mui/material/Box";
// import Slider from "@mui/material/Slider";
// import styled from "styled-components";

// const DepositSlider = () => {
//   const [deposit, setDeposit] = useRecoilState(depositAmountState);

//   function valuetext(value: number) {
//     setDeposit(value);
//     return value.toString();
//   }

//   return (
//     <Box sx={{ width: 76 }}>
//       <Slider
//         size="small"
//         defaultValue={0}
//         aria-label="small"
//         getAriaValueText={valuetext}
//       />
//     </Box>
//   );
// };

// export default DepositSlider;

// const PrettoSlider = styled(Slider)({
//   color: "#8A01D7",
//   height: 8,
//   "& .MuiSlider-track": {
//     border: "none",
//   },
//   "& .MuiSlider-thumb": {
//     height: 16,
//     width: 16,
//     backgroundColor: "#8A01D7",
//     border: "2px solid currentColor",
//   },
// });
