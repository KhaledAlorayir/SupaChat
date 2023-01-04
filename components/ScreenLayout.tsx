import { Box } from "native-base";
import { PropsWithChildren } from "react";

const ScreenLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box px={8} flex={1} bg="coolGray.800">
      {children}
    </Box>
  );
};

export default ScreenLayout;
