import { Box, Typography, Pagination } from '@mui/material';
import { MetaData } from '../models/pagination';

interface AppPaginationProps {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function AppPagination({
  metaData,
  onPageChange,
}: AppPaginationProps) {
  const { currentPage, totalCount, pageSize, totalPages } = metaData;
  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Typography>
        Displaying {(currentPage - 1) * pageSize + 1}-
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}{' '}
        of {totalCount} items
      </Typography>
      <Pagination
        color='secondary'
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => onPageChange(page)}
        size='large'
      />
    </Box>
  );
}
