import Button from "@material-ui/core/Button";

// type Props = {
//   variant?: any
//   onClick: void
//   style?: {marginBottom: number}
// }

const CardButton = (props) => {
  return (
    <div>
      <Button
        variant={props.variant}
        onClick={props.onClick}
        style={props.style}
      >
        {props.label}
      </Button>
    </div>
  );
};

export default CardButton;
