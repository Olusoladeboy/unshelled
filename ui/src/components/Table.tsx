import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Skeleton,
  TableFooter,
  TablePagination,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Props {
  tableData?: TableData | React.ReactNode;
  // any props that come into the component
}

export interface RowData {
  order_id: string;
  freight_value: string;
  order_item_id: string;
  price: string;
  product_id: string;
  seller_id: string;
  shipping_limit_date: string;
  _id: string;
}

interface TableData {
  data: RowData[];
  total?: number;
  limit?: number;
  offset?: number;
}

export default function CustomizedTables() {
  const [tableData, setTableData] = useState<RowData[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });

  const navigate = useNavigate();

  const getTableData = async () => {
    setLoading(true);
    await axios
      .get(
        `${import.meta.env.VITE_API_URL}/order_items?limit=${
          controller.rowsPerPage
        }&offset=${controller.page}`
      )
      .then(function (response) {
        const data: RowData[] = response.data.data;
        setTableData([...data]);
        setCount(response.data.total);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  };
  useEffect(() => {
    getTableData();
  }, [controller]);

  const handlePageChange = (event: React.ChangeEvent, newPage: number) => {
    setController({
      ...controller,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event: any) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  const openDetailedPage = (event: any, data: RowData) => {
    event.preventDefault();
    navigate("/details", { state: data });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order ID</StyledTableCell>
            <StyledTableCell>Order Item ID</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Freight Value</StyledTableCell>
            <StyledTableCell>Product ID</StyledTableCell>
            <StyledTableCell>Seller ID</StyledTableCell>
            <StyledTableCell>Shipping Limit Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? (
            tableData.map((row, index) => (
              <StyledTableRow
                key={index}
                onClick={(e) => openDetailedPage(e, row)}
              >
                <StyledTableCell component="th" scope="row">
                  {row.order_id}
                </StyledTableCell>
                <StyledTableCell>{row.order_item_id}</StyledTableCell>
                <StyledTableCell>{row.price}</StyledTableCell>
                <StyledTableCell>{row.freight_value}</StyledTableCell>
                <StyledTableCell>{row.product_id}</StyledTableCell>
                <StyledTableCell>{row.seller_id}</StyledTableCell>
                <StyledTableCell>{row.shipping_limit_date}</StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <Box
              sx={{
                height: "max-content",
              }}
            >
              {[...Array(controller.rowsPerPage)].map((_) => (
                <Skeleton variant="rectangular" sx={{ my: 4, mx: 1 }} />
              ))}
            </Box>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              component="div"
              onPageChange={handlePageChange}
              page={controller.page}
              count={count}
              rowsPerPage={controller.rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
