'use client';

import { Button } from "@/components/ui/button";

interface OrderButtonProps {
  buttonText: string;
  link: string;
  variant?: 'default' | 'secondary';
}

const OrderButton: React.FC<OrderButtonProps> = ({ buttonText, link, variant = 'default' }) => {
  return (
    <Button
      variant={variant}
      className="w-full"
      onClick={() => window.open(link, "_blank")}
    >
      {buttonText}
    </Button>
  );
};

export default OrderButton;
