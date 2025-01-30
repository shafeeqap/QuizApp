import PropTypes from "prop-types"
import no_data from "../../assets/images/no_data.jpg"
import './NoDataFound.css'

const NoDataFound = ({message="No data found"}) => {
  return (
    <div className="image-container">
        <img src={no_data} alt="no-data-image" style={{width:'50%'}}/>
        <h4>{message}</h4>
    </div>
  )
}

NoDataFound.propTypes={
  message: PropTypes.string
}

export default NoDataFound