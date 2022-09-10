import { LoadingButton, Masonry } from '@mui/lab';
import {
  Box,
  Grid,
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
import { ColumnsI, NetzerTablePropsI } from '../../../interfaces/table/table.interface';
import EmptyContent from '../../EmptyContent';
import Iconify from '../../Iconify';
import { Scrollbar } from '../../Scrollbar';
import TableSelectedActions from '../../table/TableSelectedActions';
import TableSkeleton from '../../table/TableSkeleton';
import { SkeletonBody } from './SkeletonBody';

export const NetzerTable: FC<NetzerTablePropsI> = ({
  columns,
  data,
  isLoading = false,
  rowAction,
  emptyData,
  pagination,
  buttonTable
}) => {
  return (
    <React.Fragment>
      <Scrollbar>
        {isLoading && [...Array(5)].map((_, index) => <TableSkeleton key={index} />)}
        {buttonTable && (
          <Grid container padding={'20px'} marginTop={'10px'} justifyContent="flex-end" spacing={2}>
            <LoadingButton
              variant={'contained'}
              color={'success'}
              onClick={() => buttonTable?.onClick()}
              sx={{ color: 'white', width: 'auto' }}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              {buttonTable?.children}
            </LoadingButton>
          </Grid>
        )}
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
              rowCount={data?.length}
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
            {!isLoading && data && data?.length > 0 && (
              <React.Fragment>
                <TableBody>
                  {data?.map((row, iRow) => (
                    <TableRow
                      key={iRow}
                      onClick={() => {
                        rowAction?.({ data: row });
                      }}
                    >
                      {columns?.map((head, index) => (
                        <TableCell key={index}>
                          {typeof head?.render === 'function'
                            ? head?.render({ data: row, index: iRow })
                            : row?.[head.key]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
                {isLoading && <SkeletonBody columns={columns} />}
              </React.Fragment>
            )}
          </Table>
          {!isLoading && data?.length > 0 && pagination && (
            <React.Fragment>
              <Box sx={{ p: 2, textAlign: 'right' }}>
                <TablePagination
                  component="div"
                  count={pagination.count || 0}
                  page={pagination.page || 0}
                  onPageChange={pagination.onPageChange}
                  rowsPerPage={pagination.rowsPerPage || 20}
                  onRowsPerPageChange={pagination.onRowsPerPageChange}
                />
              </Box>
            </React.Fragment>
          )}
        </TableContainer>

        {!isLoading && !data?.length && (
          <EmptyContent
            title={emptyData?.title || 'No hay data para mostrar'}
            description={emptyData?.description || 'No hay data para mostrar'}
            img={emptyData?.img || '/illustrations/illustration_empty_cart.svg'}
          />
        )}
      </Scrollbar>
    </React.Fragment>
  );
};
