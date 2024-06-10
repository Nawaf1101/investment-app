import React, { ReactNode } from "react";
import { Link, To } from "react-router-dom";
import { Button, ButtonProps } from "react-bootstrap";

// Define a custom button component
interface CustomButtonProps extends ButtonProps {
  to: To;
  children: ReactNode;
}
const CustomButton: React.FC<CustomButtonProps> = React.forwardRef<
  HTMLAnchorElement,
  CustomButtonProps
>(({ to, children, ...rest }, ref) => (
  <Button as={Link as any} to={to} ref={ref} {...rest}>
    {children}
  </Button>
));

CustomButton.displayName = "CustomButton";

export default CustomButton;
