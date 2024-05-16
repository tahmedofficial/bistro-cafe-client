import PropTypes from 'prop-types';

const SectionTitle = ({ heading, sebHeading }) => {
    return (
        <div className='md:w-4/12 mx-auto text-center my-8'>
            <h3 className='text-yellow-600 mb-2'>--- {sebHeading} ---</h3>
            <h2 className='text-3xl uppercase border-y-4 py-2'>{heading}</h2>
        </div>
    );
};

export default SectionTitle;

SectionTitle.propTypes = {
    heading: PropTypes.string,
    sebHeading: PropTypes.string
}