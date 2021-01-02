import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired,
  cardCountLabel: PropTypes.string.isRequired,
});
