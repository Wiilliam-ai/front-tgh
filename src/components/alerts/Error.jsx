import PropTypes from "prop-types";

const Error = ({result}) => {
  const { message, type } = result
  return (
    <div className={` ${type === 'success' ? 'bg-green-600': 'bg-red-600' } p-2 rounded-md my-2`} >
      <p className="text-sm text-white font-semibold">{message}</p>
    </div>
  );
};

Error.propTypes = {
    result: PropTypes.object.isRequired,
}

Error.defaultProps = { 
    result: {
        message: '',
        type: 'success'
     }
}

export default Error;
