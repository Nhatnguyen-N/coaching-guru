const ButtonType = ["fill", "outline"] as const;
type ButtonType = typeof ButtonType[number];
export type ButtonProps = {
  text: string,
  type?: ButtonType,
  onPress?: () => void;
  loading?: boolean
}