import { ButtonType } from '@/src/type/orders/index';
const Button = ({ className, buttonText, handleClick, disable }: ButtonType) => {
  return (
    <button className={className} onClick={handleClick} disabled={disable}>
      {buttonText}
    </button>
  );
};

export default Button;
