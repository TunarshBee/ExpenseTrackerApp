import React from "react";
import { Button, Icon } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

interface ButtonWithIconProps {
  onPress: () => void;
  iconName: string;
  color?: string;
  variant?: "solid" | "ghost";
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  onPress,
  iconName,
  color = "blue.500",
  variant = "ghost",
}) => (
  <Button onPress={onPress} variant={variant}>
    <Icon as={FontAwesome} name={iconName} color={color} />
  </Button>
);

export default ButtonWithIcon;
