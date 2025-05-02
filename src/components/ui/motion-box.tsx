import styled from 'styled-components';
import { motion } from 'framer-motion';

import { composedHelpers } from '../ui/box';

export const MotionBox = styled(motion.div)`
  ${composedHelpers}
`;

MotionBox.defaultProps = {};
