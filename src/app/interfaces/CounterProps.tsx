interface CounterProps {
  value: number;
  stock: number;
  label?: string;
  measurementUnit?: string;
  unitValue?: number;
  className?: string;
  onUpdate?: (newValue: number) => void;
}

export default CounterProps;
