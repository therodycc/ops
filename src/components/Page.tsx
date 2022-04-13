import { forwardRef, ReactNode } from 'react';
import PropTypes from 'prop-types';
// next
import Head from 'next/head';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------
interface PageProps {
  children: ReactNode;
  title: string;
  meta?: any;
}
const Page = forwardRef(({ children, title = '', meta, ...other }: PageProps, ref) => (
  <>
    <Head>
      <title>{`${title} | Farmacia Nazir`}</title>
      {meta}
    </Head>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node
};

export default Page;
