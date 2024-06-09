import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { Button, ButtonProps } from "react-bootstrap";

// Define a custom button component
const CustomButton: React.FC<any> = React.forwardRef<
  HTMLAnchorElement,
  LinkProps & ButtonProps
>(({ to, children, ...rest }, ref) => (
  <Button as={Link as any} to={to} ref={ref} {...rest}>
    {children}
  </Button>
));

CustomButton.displayName = "CustomButton";

export default CustomButton;
