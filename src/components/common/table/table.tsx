import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip
} from '@mui/material';
import React, { FC } from 'react';
import { ColumnsI } from '../../../interfaces/table/table.interface';
import EmptyContent from '../../EmptyContent';
import Iconify from '../../Iconify';
import { Scrollbar } from '../../Scrollbar';
import TableSelectedActions from '../../table/TableSelectedActions';
import TableSkeleton from '../../table/TableSkeleton';

interface TableFCProps {
  columns: Array<ColumnsI>;
  data: any[];
  isLoading?: boolean;
}

const TableFC: FC<TableFCProps> = ({ columns, data, isLoading = false }) => {
  return (
    <React.Fragment>
      <Scrollbar>
        {isLoading && [...Array(5)].map((_, index) => <TableSkeleton key={index} />)}
        {true && (
          <TableContainer
            sx={{
              minWidth: 800,
              position: 'relative'
            }}
          >
            {false && (
              <TableSelectedActions
                dense={false}
                numSelected={20}
                rowCount={data.length}
                onSelectAllRows={
                  checked => {}
                  // onSelectAllRows(
                  //     checked,
                  //     tableData.map((row) => row.id)
                  // )
                }
                actions={
                  <Tooltip title="Delete">
                    <IconButton color="info" onClick={() => {}}>
                      <Iconify icon={'eva:trash-2-outline'} />
                    </IconButton>
                  </Tooltip>
                }
              />
            )}

            <Table>
              <TableHead>
                <TableRow>
                  {columns?.map((head, index) => (
                    <TableCell key={index}>
                      {typeof head?.title === 'function' ? head?.title() : head.title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <React.Fragment>
                    <TableRow key={index} onClick={() => {}}>
                      {columns?.map((head, index) => (
                        <TableCell key={index}>
                          {typeof head?.render === 'function'
                            ? head?.render({ data: row })
                            : row?.[head.key]}
                        </TableCell>
                      ))}
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>

            {/* TODO: ----- LOGIC FOR PAGINATION -----   */}
            <Box sx={{ p: 2, textAlign: 'right' }}>
              <TablePagination
                component="div"
                count={12}
                page={12}
                onPageChange={() => {}}
                rowsPerPage={10}
                onRowsPerPageChange={() => {}}
              />
            </Box>
          </TableContainer>
        )}

        {!isLoading && !data.length && (
          <EmptyContent
            title="Sin ordenes"
            description="Al parecer no hay ordenes pendientes"
            img="/illustrations/illustration_empty_cart.svg"
          />
        )}
      </Scrollbar>
    </React.Fragment>
  );
};

export default TableFC;
